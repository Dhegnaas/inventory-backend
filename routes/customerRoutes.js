const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validateCustomer = require('../middleware/validateCustomer');
const customerController = require('../controllers/customerController');

router.use(auth); // Apply auth to all customer routes

router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.post('/', validateCustomer, customerController.create);
router.put('/:id', validateCustomer, customerController.update);
router.delete('/:id', customerController.delete);

module.exports = router;
