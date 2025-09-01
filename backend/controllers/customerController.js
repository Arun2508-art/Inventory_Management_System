const Customer = require('../models/Customer');

const fecthCustomers = async (req, res) => {
  try {
    const allCustomer = await Customer.find();
    return res.status(200).json({
      success: true,
      data: allCustomer,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching categories',
    });
  }
};

// POST create new Customer
const addCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const customer = new Customer({ name, email, phone, address });

  try {
    const newCustomer = await customer.save();
    res.status(201).json({
      success: true,
      data: newCustomer,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE Customer by id
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }
    res
      .status(201)
      .json({ success: true, message: 'Customer deleted', data: customer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  fecthCustomers,
  addCustomer,
  deleteCustomer,
};
