function Greeting() {
  const greet = (name) => {
    alert(`Hello ${name}`);
  };

  return <button onClick={() => greet("Hein")}>Say Hello</button>;
}
export default Greeting;
