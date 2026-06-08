/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

function LifecycleExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("Count changed:", count);

    return () => {
      console.log("Cleanup before next count change");
    };
  }, [count]);
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Count</button>
    </>
  );
}

export default LifecycleExample;
