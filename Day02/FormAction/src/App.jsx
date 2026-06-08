import { useState } from "react";
import UserCard from "./components/UserCard";

function App() {
  const [showUser, setShowUser] = useState(false);

  const user = {
    name: "Hein",
    role: "Full Stack Developer",
  };

  return (
    <>
      <button onClick={() => setShowUser(!showUser)}>Toggle User</button>

      {showUser && <UserCard user={user} />}
    </>
  );
}

export default App;
