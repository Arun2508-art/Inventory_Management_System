const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'Staff', 'Warehouse', 'Sales'],
      required: true,
    },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    department: { type: String },
    employeeCode: { type: String, unique: true },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inActive', 'onLeave'],
      default: 'active',
    },
    canManageInventory: { type: Boolean, default: false },
    canProcessOrders: { type: Boolean, default: false },
    canManageSuppliers: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
