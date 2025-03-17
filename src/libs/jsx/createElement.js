/**
 * JSX를 Javascript 객체로 변환하는 createElement 함수 구현
 *
 * @param {string|function} type - 요소의 타입 (태그 이름+프래그먼트 또는 컴포넌트)
 * @param {object|null} props - 요소의 속성 객체
 * @param {any[]} children - 자식 요소들 (text, 다른 jsx 객체)
 * @returns {object} JSX를 나타내는 객체
 */

export function createElement(type, props = {}, ...children) {
    const normalizedChildren = children
        .flat()
        .map((child) =>
            typeof child === "object"
                ? child
                : { type: "string", props: { nodeValue: child, children: [] } }
        );

    const elementProps = Object.freeze({
        ...props,
        children: normalizedChildren.length === 1 ? normalizedChildren[0] : normalizedChildren,
    });

    // 컴포넌트(함수형 컴포넌트)의 경우 호출하여 렌더링 결과 반환
    if (typeof type === "function") {
        return Object.freeze(type(elementProps));
    }
    // HTML 요소 객체 생성, 불변성 유지
    return Object.freeze({
        type,
        props: Object.freeze(elementProps),
    });
}
