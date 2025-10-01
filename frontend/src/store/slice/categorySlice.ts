import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { CategoryProps } from '../../utills/types';

interface CategoryState {
  categoryList: CategoryProps[];
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
  async (category: Omit<CategoryProps, '_id'>, { rejectWithValue }) => {
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

export const updateCategory = createAsyncThunk<
  any,
  { id: string; category: Omit<CategoryProps, '_id'> }
>('category/updateCategory', async ({ id, category }, { rejectWithValue }) => {
  console.log(category);
  try {
    const res = await axios.put(
      `http://localhost:5000/api/category/${id}`,
      category
    );
    if (res.data.success) {
      return res.data;
    } else {
      throw new Error('Failed to add category');
    }
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add category');
  }
});

// Async thunk to delete a category by ID
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/category/${id}`
      );
      if (response.data.success) {
        return response.data;
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
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.categoryList = state.categoryList.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to delete category';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.categoryList = state.categoryList.filter(
          (category) => category._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to delete category';
      });
  },
});

export const { setCategory } = categorySlice.actions;

// export { fecthAllProducts };

export default categorySlice.reducer;
