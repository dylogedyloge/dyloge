import React from "react";

const ParsedContentRenderer = ({ parsedContent }) => {
  const renderNode = (node, index) => {
    if (node.type === "text") {
      return node.data;
    }

    const Tag = node.name;
    const children = node.children.map((child, childIndex) =>
      renderNode(child, childIndex)
    );

    return (
      <Tag key={index} {...node.attribs}>
        {children}
      </Tag>
    );
  };

  return <>{parsedContent.map((node, index) => renderNode(node, index))}</>;
};

export default ParsedContentRenderer;
