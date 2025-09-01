import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { employeeProps } from '../../utills/types';

interface EmployeeState {
  employee: employeeProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: EmployeeState = {
  employee: [],
  status: 'idle',
  error: null,
  isLoading: false,
};

// Fetch all Employee
export const fetchEmployee = createAsyncThunk(
  'employee/fetchEmployee',
  async () => {
    const response = await axios.get('http://localhost:5000/api/employee');
    return response.data;
  }
);

// Add a new Employee
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (newEmployee: Omit<employeeProps, '_id'>) => {
    const response = await axios.post(
      'http://localhost:5000/api/employee',
      newEmployee
    );
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/employee/${id}`
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to delete supllier');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete employee');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.employee = action.payload.data;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
        state.isLoading = false;
      })
      .addCase(addEmployee.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employee.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employees';
        state.isLoading = false;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.employee = state.employee.filter(
          (emp) => emp._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch employee';
        state.isLoading = false;
      });
  },
});

export default employeeSlice.reducer;
