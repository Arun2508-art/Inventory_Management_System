const Category = require('../models/Category');

// GET all categories
const fetchAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find();
    return res.status(200).json({
      success: true,
      data: allCategory,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching categories',
    });
  }
};

// POST create new category
const addCategory = async (req, res) => {
  const { name, sku, image, description } = req.body;
  const category = new Category({ name, sku, image, description });

  try {
    const newCategory = await category.save();
    res.status(201).json({
      success: true,
      data: newCategory,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update category by id
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE category by id
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: deletedCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
