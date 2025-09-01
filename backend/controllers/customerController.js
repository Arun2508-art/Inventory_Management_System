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

// POST create new Supplier
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

module.exports = {
  fecthCustomers,
  addCustomer,
};
