import { query } from "@/lib/db";

class ProductRepository {
  async findAll() {
    const sql = "SELECT * FROM products ORDER BY created_at DESC";
    return await query(sql);
  }

  async findById(id) {
    const sql = "SELECT * FROM products WHERE id = ?";
    const results = await query(sql, [id]);
    return results[0] || null;
  }

  async create(productData) {
    const { name, price, item } = productData;
    const sql = "INSERT INTO products (name, price, item) VALUES (?, ?, ?)";
    const result = await query(sql, [name, price, item]);
    return this.findById(result.insertId);
  }

  async update(id, productData) {
    const { name, price, item } = productData;
    const sql =
      "UPDATE products SET name = ?, price = ?, item = ? WHERE id = ?";
    await query(sql, [name, price, item, id]);
    return this.findById(id);
  }

  async delete(id) {
    const sql = "DELETE FROM products WHERE id = ?";
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default new ProductRepository();
