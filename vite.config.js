import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    presets: ["@babel/preset-env"],
    plugins: [
        [
            "@babel/plugin-transform-react-jsx",
            {
                pragma: "createElement", // React.createElement 대신 사용할 함수명
                pragmaFrag: "Fragment", // React.Fragment 대신 사용할 이름
            },
        ],
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
        },
    },
    esbuild: {
        jsxFactory: "createElement",
        jsxFragment: "Fragment",
        jsxInject: `import { createElement } from './libs/jsx/createElement'`,
    },
});
