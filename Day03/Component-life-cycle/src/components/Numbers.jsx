/* eslint-disable no-unused-vars */
import React from "react";

function Numbers() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <ul>
        {numbers
          .filter((number) => number % 2 === 0)
          .map((number) => (
            <li key={number}>{number}</li>
          ))}
      </ul>
    </>
  );
}

export default Numbers;
