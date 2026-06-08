import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [submittedUser, setSubmittedUser] = useState(null);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    setSubmittedUser(name);
    setName("");
  };
  const handleClear = () => {
    setSubmittedUser(null);
  };
  return (
    <>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      {submittedUser && (
        <>
          <UserCard name={submittedUser} />

          <button onClick={handleClear}>Clear User</button>
        </>
      )}
    </>
  );
}
export default App;
