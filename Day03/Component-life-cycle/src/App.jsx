/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import React, { createRef, useState } from "react";

// const Item = ({ name, price }) => {
//   <li>
//     {name},${price}
//   </li>;
// };

// const App = (props) => {
//   let [items, setItems] = useState([
//     { id: 1, name: "Apple", price: 0.99 },
//     { id: 2, name: "Orange", price: 0.89 },
//   ]);

//   let nameRef = createRef();
//   let priceRef = createRef();

//   let add = () => {
//     let id = items.length + 1;
//     let name = nameRef.current.value;
//     let price = priceRef.current.value;

//     setItems([...items, { id, name, price }]);
//   };

//   return (
//     <>
//       <ul>
//         {items.map((i) => (
//           <Item key={i.id} name={i.name} price={i.price} />
//         ))}
//       </ul>
//       <input type="text" ref={nameRef} />
//       <br />
//       <input type="text" ref={priceRef} />
//       <br />
//       <button onClick={add}>Add</button>
//     </>
//   );
// };

// export default App;
import React from "react";
import Button from "./components/Button";
import User from "./components/User";
import Greeting from "./components/Greeting";
import Notification from "./components/Notification";
import Mounting from "./components/Mounting";
import LifecycleExample from "./components/LifecycleExample";
import FruitList from "./components/FruitList";
import Students from "./components/Students";
import Numbers from "./components/Numbers";
import BasicInput from "./components/BasicInput";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import MyForm from "./components/MyForm";
import FormText from "./components/FormText";
import ZodRegistrationForm from "./components/ZodRegistrationForm";
import FetchPost from "./components/FetchPost";
import FormOptimistic from "./components/FormOptimistic";

function App() {
  return (
    <>
      <Button />
      <User />
      <Greeting isLoggedIn={"true"} />
      <Notification messageCount={2} />
      <Mounting name={"Hla"} />
      <LifecycleExample count={1} />
      <FruitList />
      <Students />
      <Numbers />
      <BasicInput />
      <LoginForm />
      <RegistrationForm />
      <MyForm />
      <ZodRegistrationForm />
      <FormText />
      <FormOptimistic />
    </>
  );
}

export default App;
