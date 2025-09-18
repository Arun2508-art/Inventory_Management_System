process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./routes/productRouter');
const categoryRoutes = require('./routes/categoryRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const customerRoutes = require('./routes/customerRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const billingRoutes = require('./routes/billingRoutes');
const uploadImageRoutes = require('./routes/uploadImageRoutes');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('mongoDB connected'))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/upload', uploadImageRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/billing', billingRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
