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
        throw new Error('Failed to add customer');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add customer');
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/customer/${id}`
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to delete customer');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete customer');
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
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer';
        state.isLoading = false;
      });
  },
});

export default customerSlice.reducer;
