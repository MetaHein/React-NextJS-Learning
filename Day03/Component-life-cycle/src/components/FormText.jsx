import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 character long"),
    email: z.string().email("Please enter a valid email address"),
    phno: z
      .string()
      .min(5, "Phone number is too short")
      .max(11, "Phone number is too long"),
    password: z.string().min(6, "Password must be at least 6character long"),
    confirmPassword: z.string(),
    skills: z.array(z.string()).min(1, "Please select at least one skill"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const FormText = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skills: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Registration Data :", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="">Username:</label>
        <input type="text" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <input type="text" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="">PhNo:</label>
        <input type="text" {...register("phno")} />
        {errors.phno && <p>{errors.phno.message}</p>}
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="">Confirm Password:</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="">Skills:</label>
        <div>
          <input type="checkbox" value="React" {...register("skills")} />
          React
        </div>
        <div>
          <input type="checkbox" value="Python" {...register("skills")} />
          Python
        </div>
        <div>
          <input type="checkbox" value="NextJS" {...register("skills")} />
          NextJS
        </div>
        <div>
          <input type="checkbox" value="ExpressJS" {...register("skills")} />
          ExpressJS
        </div>
        {errors.skills && <p>{errors.skills.message}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default FormText;
