/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function BasicInput() {
  const [name, setName] = useState("");
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>Hello, {name}</p>
    </>
  );
}

export default BasicInput;
