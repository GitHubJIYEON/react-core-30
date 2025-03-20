/**
 * useState 훅 (단일 컴포넌트 및 다중 상태용)
 *
 * 컴포넌트 함수 내에서 상태를 선언하고 관리하기 위한 커스텀 훅입니다.
 * 호출 순서를 기준으로 hooks 배열 내에 상태를 저장합니다.
 *
 * @param {any} initialValue - 초기 상태 값
 * @returns {[any, Function]} - [state, setState] 튜플을 반환
 *
 * @example
 * const [count, setCount] = useState(0);
 * setCount(count + 1);
 */

let hooks = [];
let hookIndex = 0;

export function useState(initialValue) {
  const position = hookIndex;

  if (hooks[position] === undefined) {
    hooks[position] = initialValue;
  }

  const setState = (newValue) => {
    hooks[position] = newValue;
    rerender();
  };

  hookIndex++;
  return [hooks[position], setState];
}
