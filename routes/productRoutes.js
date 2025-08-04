const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/', productController.getAll);

// GET product by ID
router.get('/:id', productController.getById);

// POST create new product
router.post('/', productController.create);

// PUT update product
router.put('/:id', productController.update);

// DELETE product
router.delete('/:id', productController.delete);

module.exports = router;
