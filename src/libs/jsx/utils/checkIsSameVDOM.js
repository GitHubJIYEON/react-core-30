// src/libs/jsx/utils/checkIsSameVDOM.js

export function checkIsSameVDOM(oldVDOM, newVDOM) {
  // 둘 중 하나가 없으면 같은 게 아님
  if (!oldVDOM || !newVDOM) {
    return false;
  }

  const oldNode = oldVDOM.node;
  const newNode = newVDOM.node;

  // 타입이 다르면 같지 않음
  if (typeof oldNode !== typeof newNode) {
    return false;
  }

  // 텍스트 노드라면 값이 같은지 확인
  if (typeof oldNode === "string" || typeof oldNode === "number") {
    return oldNode === newNode;
  }

  // 객체(요소 노드)의 경우, 태그가 같은지 확인
  return oldNode.tag === newNode.tag;
}
