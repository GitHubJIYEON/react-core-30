# 2주차 과제

1. **`render` 함수 완성하기**
   - 재귀적으로 Virtual DOM을 순회하여 실제 DOM을 생성하는 `render` 함수를 완성합니다.
2. **`useState` 함수 구현하기**
   - 상태를 초기화하고, 상태 변경 시 컴포넌트를 재렌더링하는 `useState` 함수를 작성합니다.
3. **상태를 사용하는 컴포넌트 작성**
   - 카운터 또는 TODO 리스트 앱과 같이 상태 관리와 이벤트 처리가 필요한 컴포넌트를 만들어 보세요.

# render 함수의 역할

React의 render()는 현재의 props, state, context 에 맞는 Virtual DOM을 반환하는 함수이며, React가 이를 실제 DOM으로 효율적으로 업데이트할 수 있도록 돕는 핵심 함수

## 1. 정의

render 함수는 컴포넌트가 "어떤 UI를 보여줘야 할지"를 정의하는 함수

- UI는 결국 HTML 태그와 데이터로 구성
- render()는 현재 상태(state), 전달받은 데이터(props), 컨텍스트(context)를 기반으로 Virtual DOM(가상 DOM) 트리를 반환
- 이 반환된 Virtual DOM을 React가 실제 브라우저 DOM으로 변환하거나, 필요 시 업데이트 (diff+patch)함

## 2. 핵심 개념

- 선언적 UI 구성: render() 는 '어떻게 UI를 그릴지' 선언적으로 설명하는 함수
- 불변성: render()는 "새로운 UI 구조"를 반환할 뿐, 실제 DOM을 직접 조작하지 않음
- 자동 갱신: 상태(state)나 props가 변경되면 React는 render()를 다시 호출하여 최신 UI를 Virtual DOM으로 다시 계산하고 실제 DOM에 반영함

## 3. React에서 render()의 역할

1. 컴포넌트가 mount 될 때

- React는 컴포넌트 인스턴스를 생성하고 render()를 호추ㅜㄹ
- render()는 JSX(Virtual DOM구조)를 반환

2. 컴포넌트가 update 될 때 (예: setState 호출)

- React는 render()를 다시 호출하여 새로운 Virtual DOM을 얻음
- React 내부에서 이전 Virtual DOM과 새 Virtual DOM을 비교 (diffimg) 하고 변경된 부분만 DOM에 반영

## 4. render 함수가 왜 필요한가?

1️⃣ UI를 데이터에 맞게 자동으로 그리기 위해
매번 document.createElement()로 DOM을 수동 조작하는 것은 번거롭고, 실수도 많습니다.
render()는 "데이터가 이러할 때 UI는 이렇게 생긴다"는 UI 선언을 도와줍니다.
2️⃣ React의 Virtual DOM 시스템을 활용하기 위해
React는 render()가 반환하는 Virtual DOM을 통해 성능 최적화를 수행합니다.
diffing을 통해 실제 DOM 조작을 최소화하고, 효율적인 업데이트가 가능합니다.
3️⃣ 불변성 / 예측 가능한 상태 관리
render()는 side-effect가 없어야 하고, 항상 같은 props/state로 호출하면 동일한 UI를 반환해야 합니다.
이렇게 하면 UI 동작이 더 예측 가능하고 버그가 적은 코드를 작성할 수 있습니다.

## React 내부적으로는 어떻게 처리할까?

React는 render()로 반환된 Virtual DOM을 기반으로 다음과 같은 작업을 합니다:

컴포넌트 → Virtual DOM 반환
Virtual DOM → 실제 DOM 생성 (createElement + appendChild)
이후 diffing 단계에서 Virtual DOM 비교 및 실제 DOM 패치

## React 외 다른 라이브러리들과의 차이점
