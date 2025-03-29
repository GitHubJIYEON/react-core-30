import { checkIsSameVDOM } from "./utils/checkIsSameVDOM";
import { checkIsTextNode } from "./utils/checkIsTextNode";
import createDOM from "./createDOM";

/**
 * Virtual DOM diffing 알고리즘으로 실제 DOM을 업데이트합니다.
 *
 * @param {ChildNode} $parent - 실제 DOM의 부모 노드
 * @param {object|null} oldVDOM - 이전 Virtual DOM
 * @param {object|null} newVDOM - 새로운 Virtual DOM
 * @param {number} idx - 자식 요소의 인덱스 (기본값 0)
 */
export default function updateDOM($parent, oldVDOM, newVDOM, idx = 0) {
  // 새 Virtual DOM이 없으면 기존 노드 삭제
  if (newVDOM == null) {
    if (oldVDOM != null) {
      $parent.removeChild($parent.childNodes[idx]);
      return true;
    }
    return false;
  }

  // 기존 Virtual DOM이 없으면 새 노드 추가
  if (oldVDOM == null) {
    $parent.appendChild(createDOM(newVDOM));
    return false;
  }

  // 두 Virtual DOM이 다르면 기존 노드를 교체
  if (!checkIsSameVDOM(oldVDOM, newVDOM)) {
    $parent.replaceChild(createDOM(newVDOM), $parent.childNodes[idx]);
    return false;
  }

  // Virtual DOM이 동일한 경우 속성과 자식 노드 업데이트 진행
  const newNode = newVDOM.node;
  const oldNode = oldVDOM.node;

  if (!checkIsTextNode(newNode) && !checkIsTextNode(oldNode)) {
    updateAttributes(
      $parent.childNodes[idx],
      newNode.props || {},
      oldNode.props || {}
    );

    // 자식 노드 업데이트 (재귀적)
    const length = Math.max(
      (newNode.children && newNode.children.length) || 0,
      (oldNode.children && oldNode.children.length) || 0
    );
    let nodeDeleteCount = 0;

    for (let i = 0; i < length; i++) {
      const isNodeDeleted = updateDOM(
        $parent.childNodes[idx],
        oldNode.children?.[i],
        newNode.children?.[i],
        i - nodeDeleteCount
      );

      if (isNodeDeleted) {
        nodeDeleteCount++;
      }
    }
  }

  return false;
}

// 속성을 업데이트하는 함수
function updateAttributes(target, newProps, oldProps) {
  // 새로 추가된 props 또는 변경된 props 업데이트
  Object.entries(newProps).forEach(([attr, value]) => {
    if (oldProps[attr] === value) return;

    if (attr.startsWith("on") && typeof value === "function") {
      const eventName = attr.slice(2).toLowerCase();
      target.addEventListener(eventName, value);
    } else if (attr === "className") {
      target.setAttribute("class", value);
    } else {
      target.setAttribute(attr, value);
    }
  });

  // 기존 props 중 삭제된 props 처리
  Object.keys(oldProps).forEach((attr) => {
    if (newProps[attr] !== undefined) return;

    if (attr.startsWith("on") && typeof oldProps[attr] === "function") {
      const eventName = attr.slice(2).toLowerCase();
      target.removeEventListener(eventName, oldProps[attr]);
    } else if (attr === "className") {
      target.removeAttribute("class");
    } else {
      target.removeAttribute(attr);
    }
  });
}
