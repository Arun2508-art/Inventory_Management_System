const express = require('express');
const router = express.Router();
const {
  fetchSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/supplierController');

router.get('/', fetchSuppliers);
router.post('/', addSupplier);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

module.exports = router;
