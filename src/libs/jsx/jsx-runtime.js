/**
 * JSX 요소를 JavaScript 객체로 변환 (단일 자식 처리 / 여러 자식 처리)
 *
 * @param {string|function} type - 요소의 타입 (태그 이름, 프래그먼트, 컴포넌트)
 * @param {object|null} props - 요소의 속성 객체
 * @param {...any} children - 자식 요소들
 * @returns {object} JSX를 나타내는 객체
 */

import { createElement } from "@/libs/jsx/createElement";

// 단일 자식 엘리먼트 처리
export const jsx = (type, props, ...children) => {
    return createElement(type, props, ...children);
};

// 여러 자식을 처리
export const jsxs = (type, props, ...children) => {
    return createElement(type, props, ...children.flat(Infinity));
};
