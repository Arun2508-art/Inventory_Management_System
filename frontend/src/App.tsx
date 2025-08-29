import { Route, Routes } from 'react-router';
import './App.css';
import MainLayout from './layouts/MainLayout';
import AddCategory from './pages/category/AddCategory';
import ListCategory from './pages/category/ListCategory';
import HomePage from './pages/HomePage';
import AddProduct from './pages/product/AddProduct';
import ListProduct from './pages/product/ListProduct';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='products' element={<ListProduct />} />
        <Route path='products/add' element={<AddProduct />} />
        <Route path='categories' element={<ListCategory />} />
        <Route path='categories/add' element={<AddCategory />} />
      </Route>
    </Routes>
  );
}

export default App;
