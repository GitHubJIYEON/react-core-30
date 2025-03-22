import { createElement as baseCreateElement } from "@/libs/jsx/createElement";

/**
 * classic + automatic 혼합형 런타임
 * jsx.createElement 형태로 esbuild가 호출하게 유도
 */

export const jsx = {
  /**
   * esbuild에서 JSX → jsx.createElement 호출용
   * @param {string | Function} type - 태그명 또는 컴포넌트
   * @param {object} props - 속성
   * @param {...any} children - 자식 요소
   * @returns {object} Virtual DOM
   */

  createElement: (type, props, ...children) => {
    return baseCreateElement(type, props, ...children);
  },
};
