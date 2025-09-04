const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema(
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
    sku: { type: String, unique: true, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active',
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Warehouse = mongoose.model('warehouse', WarehouseSchema);
module.exports = Warehouse;
