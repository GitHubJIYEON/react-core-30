import { useState } from "@/libs/jsx/useState";

function Counter({ rerender }) {
  const [count, setCount] = useState(0, rerender);
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1 씩 증가하기</button>
    </div>
  );
}

export default Counter;
