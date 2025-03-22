/**
 * Virtual DOM을 실제 DOM으로 렌더링하는 함수입니다.
 *
 * Virtual DOM 트리를 재귀적으로 순회하여 실제 DOM 노드를 생성하고
 * 주어진 container에 추가합니다.
 *
 * @param {object|string|number} virtualDOM - Virtual DOM 노드 (객체) 또는 텍스트(string/number)
 * @param {HTMLElement} container - Virtual DOM이 렌더링될 실제 DOM 컨테이너
 *
 * @example
 * const vdom = {
 *   type: 'div',
 *   props: { id: 'app', children: ['Hello'] }
 * };
 * render(vdom, document.getElementById('root'));
 */

export function render(virtualDOM, container) {
  if (!container) {
    throw new Error("container가 null입니다! 유효한 DOM 요소를 전달하세요.");
  }

  // 텍스트 노드 처리
  if (typeof virtualDOM === "string" || typeof virtualDOM === "number") {
    const textNode = document.createTextNode(String(virtualDOM));
    container.appendChild(textNode);
    return;
  }

  const { type, props = {} } = virtualDOM;

  // 컴포넌트인 경우 재귀 호출
  if (typeof type === "function") {
    const componentVNode = type(props);
    render(componentVNode, container);
    return;
  }

  // 실제 DOM 요소 생성
  const domElement = document.createElement(type);

  // props 처리
  for (const key in props) {
    if (key === "children") continue;

    const value = props[key];

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      domElement.addEventListener(eventName, value);
      continue;
    }

    if (key === "className") {
      domElement.setAttribute("class", value);
      continue;
    }

    domElement.setAttribute(key, value);
  }

  // 자식 노드 렌더링
  const children = props.children || [];
  const normalizedChildren = Array.isArray(children) ? children : [children];
  normalizedChildren.forEach((child) => {
    render(child, domElement);
  });

  container.appendChild(domElement);
}
