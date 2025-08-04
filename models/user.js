const db = require('../config/db');

class User {
  static async getAll() {
    const [rows] = await db.query('SELECT id, name, email FROM users');
    return rows;
  }
  static async getById(id) {
    const [rows] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
    return rows[0];
  }
  static async create(data) {
    const { name, email, password } = data;
    // TODO: Hash password before saving (e.g., bcrypt)
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result.insertId;
  }
  static async update(id, data) {
    const { name, email, password } = data;
    if (password) {
      // Update with password
      await db.query(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, password, id]
      );
    } else {
      // Update without password
      await db.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
    }
  }
  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = User;
