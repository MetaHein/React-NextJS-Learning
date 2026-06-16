import pool from "@/lib/db";
import { userSchema } from "@/lib/validation/userSchema";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at FROM users ORDER BY id DESC",
    );
    return Response.json({ success: true, data: rows });
  } catch (error) {
    return Response.json(
      { success: false, message: "Database error", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.errors,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = validation.data;

    // Check if email exists
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );
    if (existing.length > 0) {
      return Response.json(
        { success: false, message: "Email already exists" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );

    return Response.json(
      {
        success: true,
        message: "User created successfully",
        data: { id: result.insertId, name, email },
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
