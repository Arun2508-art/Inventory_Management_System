const express = require('express');
const {
  fetchWarehouses,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
} = require('../controllers/warehouseController');
const router = express.Router();

router.get('/', fetchWarehouses);
router.post('/', addWarehouse);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

module.exports = router;
