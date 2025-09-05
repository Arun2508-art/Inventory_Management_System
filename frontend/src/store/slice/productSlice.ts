import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type {
  CategoryProps,
  ProductProps,
  SupplierProps,
} from '../../utills/types';

interface ProductState {
  products: ProductProps[];
  categoryOption: Pick<CategoryProps, 'name' | '_id'>[];
  supplierOption: Pick<SupplierProps, 'name' | '_id'>[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  categoryOption: [],
  supplierOption: [],
  status: 'idle',
  error: null,
  isLoading: false,
};

export const fetchProducts = createAsyncThunk(
  'product/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/product');
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

export const fetchCategorySupplier = createAsyncThunk(
  'product/categorysupplier/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/product/categorysupplier'
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to fetch catergory and supplier');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch catergory and supplier'
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  'product/add',
  async (newproduct: Omit<ProductProps, '_id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/product',
        newproduct
      );
      if (response.data.success) {
        return response.data;
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/product/${id}`
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.products.push(action.payload.data);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to add product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        console.log(action.payload);
        state.products = state.products.filter(
          (product) => product._id !== action.payload.data._id
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
        state.isLoading = false;
      })
      .addCase(fetchCategorySupplier.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchCategorySupplier.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.categoryOption = action.payload.category;
        state.supplierOption = action.payload.supplier;
      })
      .addCase(fetchCategorySupplier.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default productSlice.reducer;
