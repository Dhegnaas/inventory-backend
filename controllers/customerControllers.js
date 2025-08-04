const Customer = require('../models/Customer');

// GET /api/customers
exports.getAll = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.json(customers);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/customers/:id
exports.getById = async (req, res) => {
  try {
    const customer = await Customer.getById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error getting customer by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/customers
exports.create = async (req, res) => {
  try {
    const id = await Customer.create(req.body);
    res.status(201).json({ message: 'Customer created', id });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /api/customers/:id
exports.update = async (req, res) => {
  try {
    const updated = await Customer.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer updated' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE /api/customers/:id
exports.delete = async (req, res) => {
  try {
    const deleted = await Customer.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
