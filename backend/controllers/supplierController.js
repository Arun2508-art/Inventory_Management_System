const Supplier = require('../models/Supplier');

// GET all categories
const fetchSuppliers = async (req, res) => {
  try {
    const allSupplier = await Supplier.find();
    return res.status(200).json({
      success: true,
      data: allSupplier,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching categories',
    });
  }
};

// POST create new Supplier
const addSupplier = async (req, res) => {
  const { name, contactPerson, image, email, phone, address } = req.body;
  const supplier = new Supplier({
    name,
    contactPerson,
    email,
    image,
    phone,
    address,
  });

  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update Supplier by id
const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!supplier)
      return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE Supplier by id
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: 'Supplier not found' });
    }
    res
      .status(201)
      .json({ success: true, message: 'Supplier deleted', data: supplier });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  fetchSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};
