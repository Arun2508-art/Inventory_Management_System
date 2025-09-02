const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    phone: { type: String, unique: true, required: true },
    email: {
      type: String,
      unique: true,
    },
    address: { type: String },
  },
  { timestamps: true }
);

const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports = Supplier;
