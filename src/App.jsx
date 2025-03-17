function App() {
    return (
        <div id="app">
            <h2>Hello, Object!</h2>
        </div>
    );
}
export default App;

// console.log 결과
// {
//   "type": "div",
//   "props": {
//     "id": "app",
//     "children": {
//       "type": "h2",
//       "props": {
//         "children": {
//           "type": "string",
//           "props": {
//             "nodeValue": "Hello, Object!",
//             "children": []
//           }
//         }
//       }
//     }
//   }
// }
