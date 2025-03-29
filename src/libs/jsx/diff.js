/**
 * virtualDOM과 기존 DOM을 비교(diff)하여 변경 사항을 적용합니다.
 *
 * @param {HTMLElement} container - 실제 DOM 컨테이너 요소
 * @param {object|string|number} newVirtualDOM - 새로 렌더링할 Virtual DOM
 * @param {object|string|number|null} oldVirtualDOM - 이전 Virtual DOM
 * @param {number} index - 자식 요소의 인덱스 (재귀적으로 사용)
 */
export function diff(container, newVirtualDOM, oldVirtualDOM, index = 0) {
  const domNode = container.childNodes[index];

  // 이전 노드가 없는 경우 (새로 추가된 노드)
  if (!oldVirtualDOM) {
    container.appendChild(createDom(newVirtualDOM));
    return;
  }

  // 새 노드가 없는 경우 (기존 노드 삭제)
  if (!newVirtualDOM) {
    container.removeChild(domNode);
    return;
  }

  // 노드의 타입이 변경된 경우
  if (changed(newVirtualDOM, oldVirtualDOM)) {
    container.replaceChild(createDom(newVirtualDOM), domNode);
    return;
  }

  // 요소 노드의 경우 props 업데이트
  if (typeof newVirtualDOM !== "string" && typeof newVirtualDOM !== "number") {
    updateProps(domNode, newVirtualDOM.props, oldVirtualDOM.props);

    // 자식 노드를 재귀적으로 diff
    const newLength = newVirtualDOM.props.children.length;
    const oldLength = oldVirtualDOM.props.children.length;

    for (let i = 0; i < Math.max(newLength, oldLength); i++) {
      diff(
        domNode,
        newVirtualDOM.props.children[i],
        oldVirtualDOM.props.children[i],
        i
      );
    }
  }
}

// 두 virtualDOM 간 차이 여부 확인
function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    ((typeof node1 === "string" || typeof node1 === "number") &&
      node1 !== node2) ||
    node1.type !== node2.type
  );
}

// DOM 생성 함수 (render.js와 동일한 로직)
function createDom(virtualDOM) {
  if (typeof virtualDOM === "string" || typeof virtualDOM === "number") {
    return document.createTextNode(String(virtualDOM));
  }

  const { type, props } = virtualDOM;
  const dom = document.createElement(type);
  updateProps(dom, props, {});

  props.children.forEach((child) => dom.appendChild(createDom(child)));
  return dom;
}

// DOM props 업데이트
function updateProps(dom, newProps, oldProps) {
  // 새 props 추가 및 업데이트
  Object.keys(newProps).forEach((key) => {
    if (key === "children") return;

    if (newProps[key] !== oldProps[key]) {
      setProp(dom, key, newProps[key]);
    }
  });

  // 오래된 props 삭제
  Object.keys(oldProps).forEach((key) => {
    if (key === "children") return;
    if (!(key in newProps)) {
      removeProp(dom, key, oldProps[key]);
    }
  });
}

// 속성 추가 및 업데이트
function setProp(dom, name, value) {
  if (name.startsWith("on") && typeof value === "function") {
    const eventType = name.slice(2).toLowerCase();
    dom.addEventListener(eventType, value);
  } else if (name === "className") {
    dom.setAttribute("class", value);
  } else {
    dom.setAttribute(name, value);
  }
}

// 속성 삭제
function removeProp(dom, name, value) {
  if (name.startsWith("on") && typeof value === "function") {
    const eventType = name.slice(2).toLowerCase();
    dom.removeEventListener(eventType, value);
  } else if (name === "className") {
    dom.removeAttribute("class");
  } else {
    dom.removeAttribute(name);
  }
}
