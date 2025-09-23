const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: { type: String, unique: true, required: true },
    email: {
      type: String,
      unique: true,
    },
    image: {
      name: { type: String },
      url: { type: String },
    },
    address: { type: String },
  },
  { timestamps: true }
);

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
