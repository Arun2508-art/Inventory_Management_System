const express = require('express');
const router = express.Router();
const {
  fecthCustomers,
  addCustomer,
} = require('../controllers/customerController');

router.get('/', fecthCustomers);
router.post('/', addCustomer);

module.exports = router;
