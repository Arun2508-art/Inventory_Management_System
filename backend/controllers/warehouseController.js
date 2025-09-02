const Warehouse = require('../models/Warehouse');

// GET all warehouses
const fetchWarehouses = async (req, res) => {
  try {
    const allWarehouse = await Warehouse.find();
    return res.status(200).json({
      success: true,
      data: allWarehouse,
    });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching warehouses',
    });
  }
};

// POST create new warehouse
const addWarehouse = async (req, res) => {
  const { name, contactPerson, sku, location, status, description } = req.body;
  const warehouse = new Warehouse({
    name,
    contactPerson,
    sku,
    location,
    status,
    description,
  });

  try {
    const newWarehouse = await warehouse.save();
    res.status(201).json({
      success: true,
      data: newWarehouse,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update warehouse by id
const updateWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!warehouse)
      return res.status(404).json({ message: 'Warehouse not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE warehouse by id
const deleteWarehouse = async (req, res) => {
  try {
    const deletedWarehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!deleteWarehouse) {
      return res
        .status(404)
        .json({ success: false, message: 'Warehouse not found' });
    }
    res.json({ success: true, data: deleteWarehouse });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  fetchWarehouses,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
