/* eslint-disable no-unused-vars */
import { useOptimistic, useRef, useState } from "react";
import { z } from "zod";

const FormSchema = z
  .object({
    username: z.string().min(5, "Username must be at least 5 char"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    skills: z.array(z.string().min(1, "Select at least one skill")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

function FormOptimistic() {
  const formRef = useRef();

  const [users, setUsers] = useState([]);

  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state, newUser) => [
      ...state,
      {
        ...newUser,
        sending: true,
      },
    ],
  );

  async function formAction(formData) {
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      skills: formData.getAll("skills"),
    };

    const result = FormSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return;
    }

    addOptimisticUser(result.data);

    formRef.current.reset();

    await saveUser(result.data);
  }

  async function saveUser(user) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setUsers((prev) => [
      ...prev,
      {
        ...user,
        sending: false,
      },
    ]);
  }

  return (
    <>
      <h2>Registered Users</h2>

      {optimisticUsers.map((user, index) => (
        <div key={index}>
          <p>Name:{user.username}</p>
          <p>Eamil:{user.email}</p>
          <p>Skills:{user.skills.join(",")}</p>
          {user.sending && <small>Sending....</small>}
        </div>
      ))}

      <form action={formAction} ref={formRef}>
        <input type="text" name="username" placeholder="Username" />

        <input type="email" name="email" placeholder="Email" />

        <input type="password" name="password" placeholder="Password" />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />

        <div>
          <label>
            <input type="checkbox" name="skills" value="React" />
            React
          </label>

          <label>
            <input type="checkbox" name="skills" value="Node" />
            Node
          </label>

          <label>
            <input type="checkbox" name="skills" value="JavaScript" />
            JavaScript
          </label>
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default FormOptimistic;
