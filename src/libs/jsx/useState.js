let hooks = [];
let hookIndex = 0;
let rerenderCallback = null;

/**
 * rerender 함수 주입 (렌더러에서 전달)
 * @param {Function} fn - rerender 함수
 */
export function injectRerender(fn) {
  rerenderCallback = fn;
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
    rerenderCallback && rerenderCallback(); // 상태 변경 시 자동 리렌더
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
