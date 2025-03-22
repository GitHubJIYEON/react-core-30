/**
 * Virtual DOM 요소를 생성하는 함수입니다.
 *
 * JSX에서 호출된 jsx.createElement()가 실제로 호출하는 핵심 함수입니다.
 * type, props, children을 받아 Virtual DOM 객체를 반환합니다.
 *
 * @param {string | Function} type - 태그명(예: 'div', 'span') 또는 함수형 컴포넌트
 * @param {object} [props] - 요소의 속성 (id, className, onClick 등)
 * @param {...any} children - 요소의 자식 노드들 (Virtual DOM 또는 텍스트)
 * @returns {object} Virtual DOM 객체
 *
 * @example
 * createElement('div', { id: 'box' }, 'Hello')
 * // 반환:
 * // {
 * //   type: 'div',
 * //   props: {
 * //     id: 'box',
 * //     children: ['Hello']
 * //   }
 * // }
 */

export function createElement(type, props, ...children) {
  const normalizedChildren = children.flat(Infinity).map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return child;
    }
    return child;
  });

  return {
    type,
    props: {
      ...(props || {}),
      children: normalizedChildren,
    },
  };
}
