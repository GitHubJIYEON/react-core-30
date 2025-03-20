import { useState } from "@/libs/jsx/useState.js";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  function addTodo() {
    setTodos([...todos, input]);
    setInput("");
  }

  return (
    <div>
      <h2>To Do List</h2>
      <input
        type="text"
        value={input}
        oninput={(e) => setInput(e.target.value)}
      />
      <button onclick={addTodo}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
