const express = require('express');
const router = express.Router();
const {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.get('/', fetchAllCategories);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
