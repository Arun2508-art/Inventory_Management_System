import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Category {
  _id?: string;
  name: string;
  sku: string;
  desc?: string;
}

interface CategoryState {
  categoryList: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: CategoryState = {
  categoryList: [],
  status: 'idle',
  error: '',
  isLoading: false,
};

// Async thunk to fetch all categories
export const fetchAllCategory = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/category');
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

// Async thunk to add a new category
export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (category: Category, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/category',
        category
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

// Async thunk to delete a category by ID
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/category/delete',
        { id }
      );
      if (response.data.success) {
        return response.data.deletedCategory; // Assuming deleted category info returned
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete category');
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.categoryList.push(payload);
    },
    deleteCategoryy: (state, { payload }) => {
      state.categoryList = state.categoryList.filter(
        (category) => category._id !== payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.categoryList.push(action.payload.data);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to add category';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categoryList = state.categoryList.filter(
          (category) => category._id !== action.payload.deletedCategory._id
        );
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to delete category';
      });
  },
});

export const { setCategory, deleteCategoryy } = categorySlice.actions;

// export { fecthAllProducts };

export default categorySlice.reducer;
