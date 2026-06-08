import { z } from "zod";

// Define a schema
const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().nonnegative(),
});

// Validate data
const userData = {
  name: "Alice",
  age: 25,
};

const result = UserSchema.safeParse(userData);

if (result.success) {
  console.log("Valid user:", result.data);
} else {
  console.error("Validation errors:", result.error.errors);
}
