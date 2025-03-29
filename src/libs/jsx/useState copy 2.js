import { diff } from "./diff.js";

let hooks = [];
let hookIndex = 0;
let rerenderCallback = null;
let oldVDOM = null;
let root = null;

/**
 * rerender 함수와 root DOM을 주입
 * @param {Function} renderFn - Virtual DOM을 반환하는 함수
 * @param {HTMLElement} rootElement - 실제 DOM 루트
 */
export function injectRerender(renderFn, rootElement) {
  rerenderCallback = renderFn;
  root = rootElement;
}

/**
 * useState 훅
 * @param {any} initialValue - 초기 상태 값
 * @returns {[any, Function]} - [state, setState]
 */
export function useState(initialValue) {
  const position = hookIndex;

  if (hooks[position] === undefined) {
    hooks[position] = initialValue;
  }

  const setState = (newValue) => {
    hooks[position] = newValue;

    if (rerenderCallback && root) {
      const newVDOM = rerenderCallback();
      diff(root, newVDOM, oldVDOM);
      oldVDOM = newVDOM;
    }
  };

  hookIndex++;
  return [hooks[position], setState];
}

/**
 * hook 인덱스를 초기화 (렌더링 전에 호출)
 */
export function resetHookIndex() {
  hookIndex = 0;
}
