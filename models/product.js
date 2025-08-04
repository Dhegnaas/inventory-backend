const db = require('../config/db'); // Hubi in db connection-kaaga sax yahay

const Product = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products';
      db.query(query, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  create: (data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO products SET ?';
      db.query(query, data, (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE products SET ? WHERE id = ?';
      db.query(query, [data, id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM products WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }
};

module.exports = Product;
