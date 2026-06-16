import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const userUpdateSchema = userSchema.partial({
  password: true,
});
