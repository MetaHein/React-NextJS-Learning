/* eslint-disable no-unused-vars */
import React from "react";

function User() {
  const greet = (name) => {
    alert(`Hello ${name}`);
  };
  return (
    <>
      <button onClick={() => greet("John")}>Greet</button>
    </>
  );
}

export default User;
