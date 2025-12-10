const Product = require('../models/Product');
const Category = require('../models/Category');
const Supplier = require('../models/Supplier');

// GET all products
const fetchAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    return res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST create new product
const addProduct = async (req, res) => {
  const {
    name,
    sku,
    images,
    category,
    price,
    quantity,
    description,
    supplier,
  } = req.body;
  const product = new Product({
    name,
    sku,
    images,
    category,
    price,
    quantity,
    description,
    supplier,
  });
  try {
    const newProduct = await product.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update product by id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE product by id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get category and supplier
const fetchCategorySupplier = async (req, res) => {
  try {
    const category = await Category.find({}, 'name');
    const supplier = await Supplier.find({}, 'name');
    return res.json({
      success: true,
      category,
      supplier,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  fetchAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchCategorySupplier,
};
