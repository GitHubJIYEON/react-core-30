import { useState, useEffect } from "../libs/jsx/valueToUI";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`현재 카운트: ${count}`);
  }, [count]);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

export default Counter;
