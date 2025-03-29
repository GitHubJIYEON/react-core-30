// import { useState } from "./libs/jsx/useState.js";
import { useState } from "./libs/jsx/valueToUI";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const addTodo = () => {
    console.log("todoText:", todoText);
    if (todoText.trim() === "") return;
    const newTodo = { id: Date.now(), text: todoText };
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  return (
    <div>
      <h2>To Do List</h2>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
