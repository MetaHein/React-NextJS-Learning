/* eslint-disable no-unused-vars */
import React from "react";

function Greeting({ isLoggedIn }) {
  return (
    <>
      <h1>{isLoggedIn ? "Welcome Back" : "Please Log In"}</h1>
    </>
  );
}

export default Greeting;
