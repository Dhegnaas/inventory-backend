const Customer = require('../models/Customer');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const customers = await Customer.getAll();
  res.json(customers);
});

exports.getById = asyncHandler(async (req, res) => {
  const customer = await Customer.getById(req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

exports.create = asyncHandler(async (req, res) => {
  const id = await Customer.create(req.body);
  res.status(201).json({ message: 'Customer created', id });
});

exports.update = asyncHandler(async (req, res) => {
  const updated = await Customer.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json({ message: 'Customer updated' });
});

exports.delete = asyncHandler(async (req, res) => {
  const deleted = await Customer.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json({ message: 'Customer deleted' });
});
