/* eslint-disable no-unused-vars */
import React from "react";

function Students() {
  const students = [
    { id: 1, name: "Hein" },
    { id: 2, name: "San" },
    { id: 3, name: "Aung" },
    { id: 4, name: "Kyaw" },
    { id: 5, name: "Tun" },
  ];
  return (
    <>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Students;
