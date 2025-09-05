import { configureStore } from '@reduxjs/toolkit';
import billingReducer from './slice/billingSlice';
import categoryReducer from './slice/categorySlice';
import customerReducer from './slice/customerSlice';
import employeeReducer from './slice/employeeSlice';
import productReducer from './slice/productSlice';
import supplierReducer from './slice/supplierSlice';
import warehouseReducer from './slice/warehouseSlice';

export const store = configureStore({
  reducer: {
    productData: productReducer,
    employeeData: employeeReducer,
    categoryData: categoryReducer,
    supplierData: supplierReducer,
    customerData: customerReducer,
    warehouseData: warehouseReducer,
    billingData: billingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
