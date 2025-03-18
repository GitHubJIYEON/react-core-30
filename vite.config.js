// import { defineConfig } from "vite";
// import path from "path";

// export default defineConfig({
//     presets: ["@babel/preset-env"],
//     plugins: [
//         [
//             "@babel/plugin-transform-react-jsx",
//             {
//                 pragma: "createElement", // React.createElement 대신 사용할 함수명
//                 pragmaFrag: "Fragment", // React.Fragment 대신 사용할 이름
//             },
//         ],
//     ],
// });

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    presets: ["@babel/preset-env"],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    esbuild: {
        jsx: "transform", // esbuild가 JSX를 변환
        jsxImportSource: "@/libs/jsx", // 사용자 정의 jsx-runtime 위치 지정
        jsxInject: `import { jsx } from '@/libs/jsx/jsx-runtime'`, // 자동 import 주입
        jsxFactory: "jsx.createElement", // JSX → jsx.createElement() 호출로 변환
    },
});
