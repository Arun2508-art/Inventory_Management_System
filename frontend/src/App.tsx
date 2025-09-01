import { Route, Routes } from 'react-router';
import './App.css';
import MainLayout from './layouts/MainLayout';
import ListCategory from './pages/category/ListCategory';
import HomePage from './pages/HomePage';
import AddProduct from './pages/product/AddProduct';
import ListProduct from './pages/product/ListProduct';
import ListSupplier from './pages/supplier/ListSupplier';
import AddCustomer from './pages/user/customer/AddCustomer';
import ListCustomer from './pages/user/customer/ListCustomer';
import AddStaff from './pages/user/staff/AddStaff';
import ListStaff from './pages/user/staff/ListStaff';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='products' element={<ListProduct />} />
        <Route path='products/add' element={<AddProduct />} />
        <Route path='categories' element={<ListCategory />} />
        <Route path='suppliers' element={<ListSupplier />} />
        <Route path='user'>
          <Route path='staff' element={<ListStaff />} />
          <Route path='staff/add' element={<AddStaff />} />
          <Route path='customer' element={<ListCustomer />} />
          <Route path='customer/add' element={<AddCustomer />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
