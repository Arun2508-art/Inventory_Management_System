const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true, required: true }, // Stock Keeping Unit
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;