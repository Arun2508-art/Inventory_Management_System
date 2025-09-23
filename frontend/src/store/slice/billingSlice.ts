import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ScannedProduct } from '../../pages/Billing';
import type { ProductProps } from '../../utills/types';

interface billingState {
  billingItems: ScannedProduct[];
  suggestionItems: Pick<
    ProductProps,
    'name' | 'quantity' | 'category' | 'sku'
  >[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: billingState = {
  billingItems: [],
  suggestionItems: [],
  status: 'idle',
  error: null,
  isLoading: false,
};

export const fetchBillingProduct = createAsyncThunk(
  'billing/fetchProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/billing/${id}`
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

export const fetchSuggestion = createAsyncThunk(
  'billing/productSuggestion',
  async (sku: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/billing/search',
        {
          params: { sku },
        }
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

export const deleteBillingProduct = createAsyncThunk(
  'billing/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/billing/${id}`
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

export const fetchBillingAllProducts = createAsyncThunk(
  'billing/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/billing/fetchProduct'
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

const billingSlice = createSlice({
  name: 'Billing',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBillingProduct.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchBillingProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        const selectedProduct = action.payload.data;
        const existingItem = state.billingItems.find(
          (item) => item.sku === selectedProduct.sku
        );
        if (existingItem) {
          const newQuantity = existingItem.quantity + 1;
          if (newQuantity > selectedProduct.quantity) {
            console.log('Cannot add more than available stock');
            return;
          }
          existingItem.quantity = newQuantity;
        } else {
          if (1 > selectedProduct.quantity) {
            console.log('Cannot add more than available stock');
            return;
          }
          state.billingItems.push({ ...selectedProduct, quantity: 1 });
        }
      })
      .addCase(fetchBillingProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchSuggestion.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        console.log(action.payload);
        state.suggestionItems = action.payload.data;
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteBillingProduct.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteBillingProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        console.log(action.payload);
        state.billingItems = state.billingItems.filter(
          (product) => product._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteBillingProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
        state.isLoading = false;
      })
      .addCase(fetchBillingAllProducts.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchBillingAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.suggestionItems = action.payload.data;
      })
      .addCase(fetchBillingAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default billingSlice.reducer;
