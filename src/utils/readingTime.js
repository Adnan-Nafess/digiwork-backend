const calculateReadingTime = (content) => {
  if (!content) {
    return 1;
  }

  let text = "";

  const extractText = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }

    if (node.type === "text" && typeof node.text === "string") {
      text += `${node.text} `;
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(extractText);
    }
  };

  if (typeof content === "string") {
    text = content;
  } else {
    extractText(content);
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const wordsPerMinute = 200;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

module.exports = calculateReadingTime;