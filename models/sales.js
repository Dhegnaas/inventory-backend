const db = require('../config/db');

class Sale {
  static async getAll() {
    const [rows] = await db.query(
      `SELECT s.id, p.name as product_name, s.quantity, s.total_price, s.date
       FROM sales s
       JOIN products p ON s.product_id = p.id
       ORDER BY s.date DESC`
    );
    return rows;
  }
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM sales WHERE id = ?', [id]);
    return rows[0];
  }
  static async create(data) {
    const { product_id, quantity, total_price } = data;
    const [result] = await db.query(
      'INSERT INTO sales (product_id, quantity, total_price, date) VALUES (?, ?, ?, NOW())',
      [product_id, quantity, total_price]
    );
    return result.insertId;
  }
  static async update(id, data) {
    const { product_id, quantity, total_price } = data;
    await db.query(
      'UPDATE sales SET product_id = ?, quantity = ?, total_price = ? WHERE id = ?',
      [product_id, quantity, total_price, id]
    );
  }
  static async delete(id) {
    await db.query('DELETE FROM sales WHERE id = ?', [id]);
  }
}

module.exports = Sale;
