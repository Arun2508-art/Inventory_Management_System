import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { SupplierProps } from '../../utills/types';

interface SupplierState {
  suppliers: SupplierProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: SupplierState = {
  suppliers: [],
  status: 'idle',
  error: null,
  isLoading: false,
};

// Fetch all suppliers
export const fetchSuppliers = createAsyncThunk(
  'supplier/fetchSuppliers',
  async () => {
    const response = await axios.get('http://localhost:5000/api/suppliers');
    return response.data;
  }
);

// Add a new supplier
export const addSupplier = createAsyncThunk(
  'supplier/addSupplier',
  async (newSupplier: Omit<SupplierProps, '_id'>) => {
    const response = await axios.post(
      'http://localhost:5000/api/suppliers',
      newSupplier
    );
    return response.data;
  }
);

export const deleteSupplier = createAsyncThunk(
  'supplier/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/suppliers/${id}`
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to delete supllier');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete supplier');
    }
  }
);

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.suppliers = action.payload.data;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch suppliers';
        state.isLoading = false;
      })
      .addCase(addSupplier.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers.push(action.payload);
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch suppliers';
        state.isLoading = false;
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch supplier';
        state.isLoading = false;
      });
  },
});

export default supplierSlice.reducer;
