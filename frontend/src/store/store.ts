import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slice/categorySlice';
import customerReducer from './slice/customerSlice';
import supplierReducer from './slice/supplierSlice';

export const store = configureStore({
  reducer: {
    categoryData: categoryReducer,
    supplierData: supplierReducer,
    customerData: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
