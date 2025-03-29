// src/libs/jsx/utils/checkIsTextNode.js

export function checkIsTextNode(node) {
  return (
    typeof node === "string" ||
    typeof node === "number" ||
    (typeof node === "object" && node !== null && !node.tag)
  );
}
