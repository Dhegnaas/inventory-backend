app.use('/api/sales', saleRoutes);

// GET /api/sales
exports.getAll = async (req, res) => {
  try {
    const sales = await Sale.getAll();
    res.json(sales);
  } catch (error) {
    console.error('Error getting sales:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/sales/:id
exports.getById = async (req, res) => {
  try {
    const sale = await Sale.getById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    console.error('Error getting sale by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/sales
exports.create = async (req, res) => {
  try {
    const id = await Sale.create(req.body);
    res.status(201).json({ message: 'Sale recorded', id });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT /api/sales/:id
exports.update = async (req, res) => {
  try {
    const updated = await Sale.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json({ message: 'Sale updated' });
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE /api/sales/:id
exports.delete = async (req, res) => {
  try {
    const deleted = await Sale.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json({ message: 'Sale deleted' });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
