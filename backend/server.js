// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const ProductRoutes = require('./routes/productRouter');
const categoryRoutes = require('./routes/categoryRoutes');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongoDB connected'))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/products', ProductRoutes);
app.use('/api/category', categoryRoutes);

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
