import { checkIsTextNode } from "./utils/checkIsTextNode";

/**
 * Virtual DOM 객체를 실제 DOM으로 변환합니다.
 *
 * @param {object} VDOM - Virtual DOM 객체
 * @returns {HTMLElement|Text} 생성된 DOM 요소
 */
const createDOM = (VDOM) => {
  const { node } = VDOM;

  // 텍스트 노드 처리
  if (checkIsTextNode(node)) {
    if (Array.isArray(node)) {
      return document.createTextNode(node.toString());
    }
    if (typeof node === "object" && node !== null) {
      return document.createTextNode(JSON.stringify(node));
    }
    return document.createTextNode(node ? node.toString() : "");
  }

  // 일반 DOM 요소 생성
  const element = document.createElement(node.tag);

  // 속성(Props) 설정
  if (node.props) {
    for (const key in node.props) {
      const value = node.props[key];

      if (key.startsWith("data-")) {
        const dataKey = key
          .slice(5)
          .split("-")
          .map((word, index) => {
            if (index === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join("");
        element.dataset[dataKey] = value;
        continue;
      }

      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase();
        element.addEventListener(eventName, value);
        continue;
      }

      if (key === "className") {
        element.setAttribute("class", value);
        continue;
      }

      if (key === "checked") {
        element.checked = Boolean(value);
        continue;
      }

      element.setAttribute(key, value);
    }
  }

  // 자식 노드 재귀적 처리
  if (node.children && node.children.length > 0) {
    node.children.forEach((child) => {
      if (child) {
        element.appendChild(createDOM(child));
      }
    });
  }

  return element;
};

export default createDOM;
