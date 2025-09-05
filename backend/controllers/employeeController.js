const Employee = require('../models/Employee');

const fetchEmployee = async (req, res) => {
  try {
    const allEmployee = await Employee.find();
    return res.status(200).json({
      success: true,
      data: allEmployee,
    });
  } catch (error) {
    console.error('Error fetching Employee details:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching employee details',
    });
  }
};

// POST create new Employee
const addEmployee = async (req, res) => {
  try {
    const { name, email, phone, address, role, department, employeeCode } =
      req.body;

    // Optional: validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required.',
      });
    }

    // Optional: check for duplicate email or employeeCode
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(409)
        .json({ success: false, message: 'Email already exists.' });
    }

    const employee = new Employee({
      name,
      email,
      phone,
      address,
      role,
      department,
      employeeCode,
    });

    const newEmployee = await employee.save();

    res.status(201).json({ success: true, data: newEmployee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT update Employee by id
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE Employee by id
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: 'Employee not found' });
    }
    res
      .status(201)
      .json({ success: true, message: 'Employee deleted', data: employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  fetchEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
