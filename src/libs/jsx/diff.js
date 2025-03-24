// 이전 VirtualDOM 트리와 새로운 VirtualDOM 트리를 비교
// -> 변경된 최소한이 부분만 실제 DOM에 반영하여 성능 최적화

// diff 알고리즘 동작 순서
// 1. 노드가 추가되었는지 확인 (새 노드만 존재)
// 2. 노드가 삭제되었는지 확인 (기존 노드만 존재)
// 3. 노드가 교체되었는지 확인 (타입 변경 등)
// 4. 노드의 속성(props)이 변경되었는지 확인 및 적용
// 5. 자식 노드를 재귀적으로 비교

// 두 노드가 타입 또는 값에서 차이가 있는지 판단하는 함수
function isNodeChanged(oldNode, newNode) {
  return (
    typeof oldNode !== typeof newNode || // 타입이 다르면 변경된 것으로 간주
    (typeof oldNode === "string" && oldNode !== newNode) || // 텍스트 노드 값이 다르면 변경
    oldNode.type !== newNode.type
  ); // 엘리먼트 타입(div, p 등)이 다르면 변경
}

// 실제 DOM 요소의 속성을 업데이트하는 함수
function updateProps(element, oldProps, newProps) {
  // 제거된 속성 삭제
  Object.keys(oldProps).forEach((name) => {
    if (!(name in newProps)) {
      element.removeAttribute(name);
    }
  });

  // 새로 추가되었거나 변경된 속성 적용
  Object.keys(newProps).forEach((name) => {
    if (oldProps[name] !== newProps[name]) {
      element.setAttribute(name, newProps[name]);
    }
  });
}

// Virtual DOM을 재귀적으로 비교(diff)하여 실제 DOM 업데이트 수행
function diff(parent, newNode, oldNode, index = 0) {
  const currentElement = parent.childNodes[index]; // 현재 위치의 실제 DOM 노드

  // 새로운 노드가 추가된 경우
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
    return;
  }

  // 기존 노드가 삭제된 경우
  if (!newNode) {
    parent.removeChild(currentElement);
    return;
  }

  // 노드가 변경된 경우 (타입, 텍스트, 태그명이 다를 때)
  if (isNodeChanged(oldNode, newNode)) {
    parent.replaceChild(createElement(newNode), currentElement);
    return;
  }

  // 텍스트 노드이고 변경이 없으면 종료
  if (typeof newNode === "string") {
    return;
  }

  // 노드 타입이 같으면 props를 업데이트
  updateProps(currentElement, oldNode.props, newNode.props);

  // 자식 노드들에 대해 재귀적으로 diff 수행
  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    diff(currentElement, newNode.children[i], oldNode.children[i], i);
  }
}

// Virtual DOM 객체를 실제 DOM 요소로 변환하는 함수
function createElement(node) {
  // 텍스트 노드인 경우
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  // 엘리먼트 노드인 경우 (div, p 등)
  const element = document.createElement(node.type);

  // props (속성) 설정
  Object.entries(node.props || {}).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  // 자식 노드를 재귀적으로 생성하여 추가
  (node.children || [])
    .map(createElement)
    .forEach((child) => element.appendChild(child));

  return element;
}

export { diff, createElement };
