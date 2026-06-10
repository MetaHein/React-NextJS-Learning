/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";

function Effect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count has changed!");
  }, [count]);
  return (
    <>
      <p>Count is : {count}</p>

      <div>
        <button onClick={() => setCount(count + 1)}>Add 1</button>
        <button onClick={() => setCount(count - 1)}>Decrease 1</button>

        <button onClick={() => setCount(count + 10)}>Add 10</button>
        <button onClick={() => setCount(count - 10)}>Decrease 10</button>

        <button onClick={() => setCount(0)}>Reset count</button>
      </div>
    </>
  );
}

export default Effect;
