import App from "./App.jsx";
import { render } from "./libs/jsx/render.js";

const root = document.getElementById("root");
const appElement = App();

console.log("App()이 반환한 Virtual DOM:", appElement);

render(appElement, root); //실제 DOM 렌더링
console.log("렌더링 후 root.innerHTML:", root.innerHTML);

// console.log(JSON.stringify(appElement, null, 2)); //virtual DOM 생성 확인
