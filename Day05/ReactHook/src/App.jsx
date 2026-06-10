/* eslint-disable no-unused-vars */
import React from "react";
import UseContext from "./pages/UseContext";
import { useQuery } from "./hooks/useQuery";

function App() {
  const { data, isLoading, error } = useQuery("users/2");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <UseContext />
      <h3>Custom Hook</h3>
      <p>User Email: {data?.data?.email}</p>
    </>
  );
}

export default App;
