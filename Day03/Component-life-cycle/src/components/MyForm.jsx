/* eslint-disable no-unused-vars */
import React from "react";

function MyForm() {
  return (
    <>
      <label htmlFor="">
        Text input: <input name="myInput" />
      </label>
      <hr />
      <label htmlFor="">
        Checkbox: <input type="checkbox" name="myCheckbox" />
      </label>
      <hr />
      <p>
        Radio Button:
        <label htmlFor="">
          <input type="radio" name="myRadio" value="option1" />
          Option 1
        </label>
        <label htmlFor="">
          <input type="radio" name="myRadio" value="option2" />
          Option 2
        </label>
        <label htmlFor="">
          <input type="radio" name="myRadio" value="option3" />
          Option 3
        </label>
      </p>
    </>
  );
}

export default MyForm;
