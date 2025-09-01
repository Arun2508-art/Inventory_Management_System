import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CustomerProps } from '../../utills/types';

interface CustomerState {
  customers: CustomerProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: CustomerState = {
  customers: [],
  status: 'idle',
  error: null,
  isLoading: false,
};

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/customer');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch customer');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch customer');
    }
  }
);

export const addCustomer = createAsyncThunk(
  'customer/add',
  async (newcustomer: Omit<CustomerProps, '_id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/customer',
        newcustomer
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to add category');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add category');
    }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.customers = action.payload.data;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addCustomer.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.customers.push(action.payload.data);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to add customer';
      });
  },
});

export default customerSlice.reducer;
