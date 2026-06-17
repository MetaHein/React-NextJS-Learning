import { query } from "../lib/db.js";

export const userRepo = {
  async findByEmail(email) {
    const results = await query("SELECT * FROM users WHERE email = ?", [email]);
    return results[0] || null;
  },

  async create(userData) {
    // Check what's actually being passed
    console.log("Creating user with data:", userData);

    const { email, password_hash, name } = userData;

    // Validate all fields are present
    if (!email || !password_hash || !name) {
      console.error("Missing required fields:", {
        email: !!email,
        password_hash: !!password_hash,
        name: !!name,
      });
      throw new Error("All fields are required: email, password_hash, name");
    }

    // Use the correct column names - your table likely has 'password_hash' column
    const result = await query(
      "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)",
      [email, password_hash, name],
    );

    return result.insertId;
  },

  async findById(id) {
    const results = await query("SELECT * FROM users WHERE id = ?", [id]);
    return results[0] || null;
  },

  async update(id, userData) {
    // Filter out undefined values
    const updates = [];
    const values = [];

    // Only update fields that are provided
    if (userData.name !== undefined) {
      updates.push("name = ?");
      values.push(userData.name);
    }
    if (userData.email !== undefined) {
      updates.push("email = ?");
      values.push(userData.email);
    }
    if (userData.password_hash !== undefined) {
      updates.push("password_hash = ?");
      values.push(userData.password_hash);
    }

    if (updates.length === 0) {
      return true;
    }

    values.push(id);
    const queryString = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    const result = await query(queryString, values);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const result = await query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  async findAll() {
    return await query("SELECT * FROM users");
  },
};
