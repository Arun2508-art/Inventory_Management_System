const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
    sku: { type: String, unique: true, required: true }, // Stock Keeping Unit
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, default: null },
    quantity: { type: Number, default: null },
    description: { type: String },
    supplier: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Supplier',
      validate: {
        validator: function (value) {
          // allow empty string
          if (value === '') return true;

          // allow valid ObjectId
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: 'Category must be a valid ObjectId or an empty string.',
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
