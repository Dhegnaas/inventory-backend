const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/', userController.getAll);

// GET user by ID
router.get('/:id', userController.getById);

// POST create new user
router.post('/', userController.create);

// PUT update user
router.put('/:id', userController.update);

// DELETE user
router.delete('/:id', userController.delete);

module.exports = router;
