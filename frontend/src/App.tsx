import { Route, Routes } from 'react-router';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Billing from './pages/Billing';
import ListCategory from './pages/category/ListCategory';
import HomePage from './pages/HomePage';
import AddProduct from './pages/product/AddProduct';
import ListProduct from './pages/product/ListProduct';
import ListCustomer from './pages/user/customer/ListCustomer';
import AddStaff from './pages/user/staff/AddStaff';
import ListStaff from './pages/user/staff/ListStaff';
import ListSupplier from './pages/user/supplier/ListSupplier';
import ListWarehouse from './pages/warehouse/ListWarehouse';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='products' element={<ListProduct />} />
        <Route path='products/add' element={<AddProduct />} />
        <Route path='categories' element={<ListCategory />} />
        <Route path='user'>
          <Route path='staff' element={<ListStaff />} />
          <Route path='staff/add' element={<AddStaff />} />
          <Route path='customer' element={<ListCustomer />} />
          <Route path='suppliers' element={<ListSupplier />} />
        </Route>
        <Route path='warehouses' element={<ListWarehouse />} />
        <Route path='billing' element={<Billing />} />
      </Route>
    </Routes>
  );
}

export default App;
