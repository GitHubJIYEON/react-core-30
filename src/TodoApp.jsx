// TodoApp.jsx
import { useState } from "./libs/jsx/useState.js";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const addTodo = () => {
    if (todoText.trim() === "") return;
    setTodos([...todos, todoText]);
    setTodoText("");
  };

  return (
    <div>
      <h2>To Do List</h2>
      <input
        type="text"
        value={todoText}
        onInput={(e) => setTodoText(e.target.value)}
      />
      <button onClick={addTodo}>추가</button>
      {/* key- index 고려하기 */}
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
