const { JSDOM } = require("jsdom");

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
    return { type: "text", text: node.nodeValue };
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

  for (const childNode of node.childNodes) {
    const child = parseNode(childNode);
    if (child) {
      obj.content.push(child);
    }
  }

  return obj;
}

module.exports = function (html) {
  const { document } = new JSDOM(html).window;
  const body = document.body;

  const content = [];
  for (const childNode of body.childNodes) {
    const child = parseNode(childNode);
    if (child) {
      content.push(child);
    }
  }

  return {
    type: "doc",
    content,
  };
};
