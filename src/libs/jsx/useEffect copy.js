let hooks = [];
let hookIndex = 0;
let effects = []; // effect 콜백 저장소
let cleanups = []; // cleanup 콜백 저장소
let rerenderCallback = null;
let oldVDOM = null;
let root = null;

/**
 * rerender 함수와 root DOM을 주입
 */
export function injectRerender(renderFn, rootElement) {
  rerenderCallback = renderFn;
  root = rootElement;
}

/**
 * useState 훅
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
      runEffects(); // 리렌더 후 effect 실행
    }
  };

  hookIndex++;
  return [hooks[position], setState];
}

/**
 * useEffect 훅 (cleanup 지원)
 */
export function useEffect(callback, deps) {
  const position = hookIndex;

  const prevDeps = hooks[position];
  const hasNoDeps = !deps;
  const hasChanged = prevDeps
    ? !deps.every((dep, i) => dep === prevDeps[i])
    : true;

  if (hasNoDeps || hasChanged) {
    // 이전 cleanup 실행
    if (cleanups[position]) {
      cleanups[position]();
    }

    // effect 큐에 콜백 등록
    effects.push(() => {
      const cleanup = callback();
      if (typeof cleanup === "function") {
        cleanups[position] = cleanup; // cleanup 등록
      }
    });

    hooks[position] = deps;
  }

  hookIndex++;
}

/**
 * effect 큐 실행 (렌더 후 실행됨)
 */
function runEffects() {
  effects.forEach((cb) => cb());
  effects = []; // 실행 후 큐 초기화
}

/**
 * hook 인덱스를 초기화 (렌더링 전에 호출)
 */
export function resetHookIndex() {
  hookIndex = 0;
}
