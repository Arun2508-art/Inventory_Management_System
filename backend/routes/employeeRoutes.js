const express = require('express');
const {
  fetchEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const router = express.Router();

router.get('/', fetchEmployee);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
