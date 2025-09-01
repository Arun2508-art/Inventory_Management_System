const express = require('express');
const router = express.Router();
const {
  fecthCustomers,
  addCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

router.get('/', fecthCustomers);
router.post('/', addCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
