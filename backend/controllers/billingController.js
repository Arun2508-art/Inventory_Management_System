const Product = require('../models/Product');

const generateBillingForProduct = async (req, res) => {
  try {
    const product = req.params.id;

    const billingProduct = await Product.findOne({ sku: product });

    if (!billingProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, data: billingProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const suggestionProduct = async (req, res) => {
  try {
    const skuQuery = (req.query.sku || '').trim();

    if (!skuQuery) {
      return res
        .status(400)
        .json({ success: false, message: 'SKU query is required' });
    }

    const billingProduct = await Product.find({
      sku: { $regex: skuQuery, $options: 'i' },
    }).populate('category', 'name');

    if (billingProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No matching products found' });
    }
    return res.status(200).json({ success: true, data: billingProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const fetchSuggestionProduct = async (req, res) => {
  try {
    const billingProduct = await Product.find().populate('category', 'name');
    return res.status(200).json({ success: true, data: billingProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE product by id
const deleteBillingProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  generateBillingForProduct,
  suggestionProduct,
  deleteBillingProduct,
  fetchSuggestionProduct,
};
