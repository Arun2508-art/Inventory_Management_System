const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['admin', 'manager', 'staff', 'warehouse', 'sales'],
      required: true,
    },
    phone: { type: String },
    address: { type: String },
    department: { type: String },
    employeeCode: { type: String, unique: true },
    status: {
      type: String,
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
