import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be less than 100 characters"),
  price: z
    .number()
    .positive("Price must be positive")
    .min(0.01, "Price must be at least 0.01"),
  item: z
    .string()
    .min(2, "Item must be at least 2 characters")
    .max(50, "Item must be less than 50 characters"),
});

// export const productUpdateSchema = productSchema.partial();
