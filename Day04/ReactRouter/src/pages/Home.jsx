/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const inputRef = useRef(null);
  const [submittedName, setSubmittedName] = useState();

  const onSubmitHandler = () => {
    if (inputRef.current === null) {
      return;
    }
    setSubmittedName(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current?.focus();
  };
  return (
    <>
      <div className="m-auto w-100">
        <h3>Using Ref</h3>
        <p>You entered this name: {submittedName ?? '" "'}</p>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={inputRef} className="bg-gray-200" />
        <button
          onClick={() => {
            onSubmitHandler();
          }}
          className="rounded bg-amber-400 px-4 py-2"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Home;
