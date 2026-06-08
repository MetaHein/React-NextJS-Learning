/* eslint-disable no-unused-vars */
import React from "react";

function FruitList() {
  const fruits = ["Apple", "Banana", "Orange"];

  return (
    <>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </>
  );
}

export default FruitList;
