const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sku: { type: String, unique: true, required: true },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
