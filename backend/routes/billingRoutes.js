const express = require('express');
const router = express.Router();
const {
  generateBillingForProduct,
  suggestionProduct,
  deleteBillingProduct,
  fetchSuggestionProduct,
} = require('../controllers/billingController');

router.get('/fetchProduct', fetchSuggestionProduct);
router.get('/search', suggestionProduct);
router.get('/:id', generateBillingForProduct);
router.delete('/:id', deleteBillingProduct);

module.exports = router;
