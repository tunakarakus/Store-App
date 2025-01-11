import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create axios instance
const productApi = axios.create({
    baseURL: 'http://localhost:5001/api/products',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests only for protected routes
productApi.interceptors.request.use(
    (config) => {
        // Only add token for admin operations (create, update, delete)
        if (config.method !== 'get') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Fetch all products
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching products...');
            const response = await productApi.get('/');
            console.log('Products response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            console.error('Error response:', error.response);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch products'
            );
        }
    }
);

// Create product
export const createProduct = createAsyncThunk(
    'products/create',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await productApi.post('/', productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create product'
            );
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await productApi.put(`/${id}`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update product'
            );
        }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, { rejectWithValue }) => {
        try {
            await productApi.delete(`/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete product'
            );
        }
    }
);

const initialState = {
    products: [],
    loading: false,
    error: null,
    success: false,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log('Fetching products - pending');
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
                console.log('Fetching products - fulfilled:', action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log('Fetching products - rejected:', action.payload);
            })
            // Create product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
                state.success = true;
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                );
                state.success = true;
                state.error = null;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
                state.success = true;
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { clearError, clearSuccess } = productSlice.actions;
export default productSlice.reducer; 