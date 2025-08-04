const db = require('../config/db');

class Customer {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM customers');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, email, phone, address } = data;
    const [result] = await db.query(
      'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, email, phone, address } = data;
    const [result] = await db.query(
      'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM customers WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Customer;
