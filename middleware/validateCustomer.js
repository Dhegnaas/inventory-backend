// middleware/validateCustomer.js
module.exports = function validateCustomer(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name iyo Email waa qasab' });
  }
  next();
};
