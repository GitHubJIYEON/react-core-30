export function render(virtualDOM, container) {
  // 텍스트 노드 처리
  if (typeof virtualDOM === "string" || typeof virtualDOM === "number") {
    const textNode = document.createTextNode(String(virtualDOM));
    container.appendChild(textNode);
    return;
  }

  // 실제 DOM 요소 생성
  const { tag, props, children } = virtualDOM.node;
  const domElement = document.createElement(tag);

  // props 적용 (className, id, 이벤트 등)
  if (props) {
    for (const key in props) {
      const value = props[key];
      if (key.startsWith("on") && typeof value === "function") {
        // onClick -> click
        const eventName = key.slice(2).toLowerCase();
        domElement.addEventListener(eventName, value);
      } else if (key === "className") {
        domElement.setAttribute("class", value);
      } else {
        domElement.setAttribute(key, value);
      }
    }
  }

  // 자식 요소 재귀적으로 렌더링
  children.forEach(function (child) {
    render(child, domElement);
  });

  // 부모 컨테이너에 추가
  container.appendChild(domElement);
}
