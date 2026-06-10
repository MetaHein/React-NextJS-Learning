/* eslint-disable no-unused-vars */
import { useState } from "react";
import Component2 from "./Component2";
import { createContext } from "react";

const UserContext = createContext();

function Component1() {
  const [user, setUser] = useState("Linus");

  return (
    <UserContext.Provider value={user}>
      <h1>{`Hello ${user} !`}</h1>
      <Component2 />
    </UserContext.Provider>
  );
}

export default Component1;
