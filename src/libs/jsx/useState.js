// 전역 상태 관리
let states = [];
let hookIndex = 0;
let rerender = null;

/**
 * rerender 함수 주입
 * @param {Function} rerenderFunction - 컴포넌트를 다시 렌더링하는 함수
 */
export function injectRerender(rerenderFunction) {
  rerender = rerenderFunction;
}

/**
 * 훅 인덱스 초기화 (리렌더링 전 호출)
 */
export function resetHookIndex() {
  hookIndex = 0;
}

/**
 * React의 useState와 유사한 상태 관리 훅
 * @param {any} initialValue - 상태의 초기값
 * @returns {Array} [현재 상태 값, 상태 업데이트 함수]
 */
export function useState(initialValue) {
  const currentIndex = hookIndex;
  hookIndex++;

  // 초기 렌더링 시 상태 초기화
  if (states[currentIndex] === undefined) {
    states[currentIndex] =
      typeof initialValue === "function" ? initialValue() : initialValue;
  }

  // 상태 업데이트 함수
  const setState = (newValue) => {
    // 함수인 경우 이전 상태를 인자로 받는다
    const value =
      typeof newValue === "function"
        ? newValue(states[currentIndex])
        : newValue;

    // 값이 변경된 경우만 리렌더링
    if (states[currentIndex] !== value) {
      states[currentIndex] = value;

      // 리렌더링 트리거
      if (rerender) {
        rerender();
      }
    }
  };

  return [states[currentIndex], setState];
}

export default useState;
