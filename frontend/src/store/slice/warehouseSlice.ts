import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { warehouseProps } from '../../utills/types';

interface WarehouseState {
  warehouseList: warehouseProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: WarehouseState = {
  warehouseList: [],
  status: 'idle',
  error: '',
  isLoading: false,
};

// Async thunk to fetch all warehouse
export const fetchWarehouses = createAsyncThunk(
  'warehouse/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/warehouse');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch warehouses');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch warehouses');
    }
  }
);

// Async thunk to add a new warehouse
export const addWarehouse = createAsyncThunk(
  'warehouse/add',
  async (warehouse: Omit<warehouseProps, '_id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/warehouse',
        warehouse
      );

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to add warehouse');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add warehouse');
    }
  }
);

// Async thunk to delete a warehouse by ID
export const deleteWarehouse = createAsyncThunk(
  'warehouse/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/warehouse/${id}`
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to delete warehouse');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete warehouse');
    }
  }
);

export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.warehouseList = action.payload.data;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addWarehouse.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addWarehouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.warehouseList.push(action.payload.data);
      })
      .addCase(addWarehouse.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to add category';
      })
      .addCase(deleteWarehouse.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.warehouseList = state.warehouseList.filter(
          (warehouse) => warehouse._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Failed to delete warehouse';
      });
  },
});

export default warehouseSlice.reducer;
