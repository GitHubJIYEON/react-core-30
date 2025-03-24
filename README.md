# React Core

## 개발 환경 구축

1. `@babel/plugin-transform-react-jsx` 플러그인을 통해 automatic과 importSource를 활용하여 `src/jsx` 폴더에 `jsx-runtime.js` 파일을 구현했습니다.
2. Babel을 사용하여 JSX를 트랜스파일링 하는 환경을 설정하고 필요한 Babel 플러그인과 설정 파일을 작성합니다.
3. createElement 함수 구현과 Virtual DOM 생성합니다.

## 렌더 함수 구현하기 및 상태 업데이트

1. 재귀적으로 Virtual DOM을 순회하여 실제 DOM을 생성하는 render함수를 완성합니다.
2. `createDomElement`에서 virtual DOM인 element 객체를 HTML로 변환합니다.
3. 상태를 저장하고 업데이트 할 수 있는 useState 함수 구현합니다.
4. 상태 변경에 따라 해당 컴포넌트를 다시 렌더링하고, 화면을 업데이트 합니다.
5. 간단한 TO DO LIST 앱을 만들어 전체적은 동작 흐름을 정리합니다.

## Virtual DOM 비교와 이벤트 처리 구현하기

1. 이전에 만든 render함수를 개선하여 diff 알고리즘을 추가합니다.
2. 상태 변경 시 새로운 Virtual DOM을 생성하고, 이전 Virtual DOM과 비교하여 변경된 부분만 업데이트합니다.
3. 이벤트 처리 및 Synthetic Event 시스템을 구현합니다.
4. 이벤트 위임을 통해 많은 이벤트 핸들러를 효율적으로 관리하는 방법을 이해합니다.
5. 사이드 이페트를 관리하기 위한 useEffect 훅 구현합니다.
