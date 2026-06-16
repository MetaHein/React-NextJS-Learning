import pool from "@/lib/db";
import { userSchema, userUpdateSchema } from "@/lib/validation/userSchema";
import bcrypt from "bcryptjs";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const [rows] = await pool.query(
      "SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, data: rows[0] });
  } catch (error) {
    return Response.json(
      { success: false, message: "Database error", error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate with Zod
    const validation = userUpdateSchema.safeParse(body);
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

    // Check if user exists
    const [existing] = await pool.query("SELECT id FROM users WHERE id = ?", [
      id,
    ]);
    if (existing.length === 0) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Check email uniqueness
    if (email) {
      const [emailCheck] = await pool.query(
        "SELECT id FROM users WHERE email = ? AND id != ?",
        [email, id],
      );
      if (emailCheck.length > 0) {
        return Response.json(
          { success: false, message: "Email already exists" },
          { status: 400 },
        );
      }
    }

    // Build update query dynamically
    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("name = ?");
      values.push(name);
    }
    if (email) {
      updateFields.push("email = ?");
      values.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      values.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      return Response.json(
        { success: false, message: "No fields to update" },
        { status: 400 },
      );
    }

    values.push(id);
    await pool.query(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      values,
    );

    return Response.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Database error", error: error.message },
      { status: 500 },
    );
  }
}
