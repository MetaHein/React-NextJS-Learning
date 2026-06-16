import mysql from "mysql2/promise";
import { dbConfig } from "@/config/database";

let pool = null;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function query(sql, params) {
  const connection = await getConnection();
  const [results] = await connection.execute(sql, params);
  return results;
}
