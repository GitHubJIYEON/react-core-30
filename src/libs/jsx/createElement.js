/**
 * JSX를 JavaScript 객체로 변환하는 createElement 함수
 *
 * @param {string|function} type - 요소의 타입 (HTML 태그명, Fragment, 컴포넌트 함수)
 * @param {object|null} props - 요소의 속성 객체 (attributes, event handlers 등)
 * @param {...any} children - 자식 요소들 (문자열, 숫자, Virtual DOM 객체 등)
 * @returns {object} Virtual DOM을 나타내는 객체
 */

export function createElement(type, props = {}, ...children) {
    const normalizedChildren = children
        .flat()
        .map((child) =>
            typeof child === "object"
                ? child
                : { type: "TEXT_ELEMENT", props: { nodeValue: child, children: [] } }
        );

    const elementProps = Object.freeze({
        ...props,
        children: normalizedChildren.length === 1 ? normalizedChildren[0] : normalizedChildren,
    });

    return Object.freeze({
        type,
        props: elementProps,
    });
}
