import db from "@/lib/db";

export async function getProducts() {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
}

export async function getProductById(id) {
  const [rows] = await db.query("SELECT * FROM products WHERE id=?", [id]);
  return rows[0];
}

export async function createProduct(product) {
  const { name, price } = product;

  const [result] = await db.query(
    "INSERT INTO products(name,price) VALUES(?,?)",
    [name, price],
  );

  return result.insertId;
}

export async function updateProduct(id, product) {
  const { name, price } = product;

  await db.query("UPDATE products SET name=?, price=? WHERE id=?", [
    name,
    price,
    id,
  ]);
}

export async function deleteProduct(id) {
  await db.query("DELETE FROM products WHERE id=?", [id]);
}
