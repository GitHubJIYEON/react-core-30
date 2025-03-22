import App from "./App.jsx";
import { render } from "./libs/jsx/render.js";
import { injectRerender, resetHookIndex } from "./libs/jsx/useState.js";

const root = document.getElementById("root");

function rerender() {
  root.innerHTML = "";
  resetHookIndex(); // hookIndex 초기화
  const appElement = App();
  render(appElement, root);
}

// useState 훅 시스템에 rerender 주입
injectRerender(rerender);

// 앱 초기 실행
rerender();
