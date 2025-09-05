const express = require('express');
const {
  fetchAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchCategorySupplier,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', fetchAllProduct);
router.get('/categorysupplier', fetchCategorySupplier);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
