// TodoApp.jsx
import { useState } from "./libs/jsx/useState.js";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div>
      <h2>To Do List</h2>
      <input
        type="text"
        value={input}
        oninput={(e) => setInput(e.target.value)}
      />
      <button onclick={addTodo}>추가</button>
      {/* key- index 고려하기 */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
