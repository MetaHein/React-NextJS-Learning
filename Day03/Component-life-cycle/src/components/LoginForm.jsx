/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(`Submitted: ${username}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginForm;
