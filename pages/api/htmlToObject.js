import { JSDOM } from "jsdom";
import { parse } from "node-html-parser";

function parseAttributes(attributes) {
  const attrs = {};

  for (const attribute of attributes) {
    attrs[attribute.name.toLowerCase()] = attribute.value;
  }

  return attrs;
}

function parseNode(node) {
  if (node.nodeType === 3) {
    // Text node
    const text = node.nodeValue.trim();
    if (text === "") {
      return null;
    }
    return { type: "text", text };
  }

  if (node.nodeType === 8) {
    // Comment node
    return null;
  }

  const obj = {
    type: node.nodeName.toLowerCase(),
    attrs: parseAttributes(node.attributes),
    content: [],
  };

  if (obj.type.startsWith("h")) {
    // Set level attribute for heading tags
    const level = parseInt(obj.type.slice(1));
    if (!isNaN(level)) {
      obj.type = "heading";
      obj.attrs = { level };
    }
  }

  for (const childNode of node.childNodes) {
    const child = parseNode(childNode);
    if (child) {
      obj.content.push(child);
    }
  }

  return obj;
}

function convertObject(obj) {
  if (obj.type === "p") {
    obj.type = "paragraph";
  } else if (obj.type === "ol") {
    obj.type = "orderedList";
    obj.attrs = { tight: true, start: parseInt(obj.attrs.start) || 1 };
  } else if (obj.type === "ul") {
    obj.type = "bulletList";
    obj.attrs = { tight: true };
  } else if (obj.type === "hr") {
    obj.type = "horizontalRule";
  } else if (obj.type === "li") {
    obj.type = "listItem";
    if (obj.content.length === 1 && obj.content[0].type === "text") {
      const listItemText = obj.content[0].text;
      obj.content = [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: listItemText,
            },
          ],
        },
      ];
    } else if (obj.content.length > 0) {
      obj.content = obj.content
        .map(convertObject)
        .filter((item) => item !== null);
    } else {
      obj.content = [];
    }
  } else if (obj.type === "a") {
    obj.type = "text";
    obj.marks = [
      {
        type: "link",
        attrs: {
          href: obj.attrs.href,
          target: obj.attrs.target,
          class: obj.attrs.class,
        },
      },
    ];
    obj.text = obj.content[0].text;
    delete obj.attrs;
    delete obj.content;
  } else if (obj.type === "code") {
    obj.type = "text";
    obj.marks = [{ type: "code" }];
  } else if (obj.type === "img") {
    obj.type = "image";
    obj.attrs.alt = obj.attrs.alt || "";
    obj.attrs.title = obj.attrs.title || "";
  }

  if (obj.content && Array.isArray(obj.content)) {
    obj.content = obj.content
      .map(convertObject)
      .filter((item) => item !== null);

    if (
      obj.type === "orderedList" &&
      obj.content.length === 1 &&
      obj.content[0].type === "listItem"
    ) {
      return obj.content[0];
    }
  }

  return obj;
}

export default function handler(req, res) {
  const { html } = req.body;

  const { document } = new JSDOM(html).window;
  const body = document.body;

  const content = [];
  for (const childNode of body.childNodes) {
    const child = parseNode(childNode);
    if (child) {
      content.push(child);
    }
  }

  const obj = {
    type: "doc",
    content,
  };

  const convertedObject = convertObject(obj);

  res.status(200).json({ htmlObject: convertedObject });
}
