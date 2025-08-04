app.use('/api/sales', saleRoutes);
const router = express.Router();
const saleController = require('../controllers/saleController');

// GET all sales
router.get('/', saleController.getAll);

// GET sale by ID
router.get('/:id', saleController.getById);

// POST create new sale
router.post('/', saleController.create);

// PUT update sale
router.put('/:id', saleController.update);

// DELETE sale
router.delete('/:id', saleController.delete);

module.exports = router;
