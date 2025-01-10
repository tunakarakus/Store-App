import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { clearCart, initializeUserCart } from './cartSlice';
import axios from 'axios';

// Helper function to safely parse JSON from localStorage
const getStoredUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        localStorage.removeItem('user');
        return null;
    }
};

// Verify token and get user data
export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return null;
            }
            const response = await api.get('/users/profile');
            const userData = { ...response.data, token };
            return userData;
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return rejectWithValue(error.message || 'Authentication failed');
        }
    }
);

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/users/register', userData);
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Registration failed. Please try again.'
            );
        }
    }
);

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5001/api/users/login', credentials);
            localStorage.setItem('token', response.data.token);
            
            // Immediately fetch user data after successful login
            const userResponse = await axios.get('http://localhost:5001/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            });
            
            // Initialize user's cart after successful login
            await dispatch(initializeUserCart({ userId: userResponse.data._id }));
            
            return {
                token: response.data.token,
                user: userResponse.data
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(clearCart());
    dispatch(initializeUserCart({ userId: null }));
});

const initialState = {
    user: getStoredUser(),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Verify Token
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload;
                    state.token = action.payload.token;
                    localStorage.setItem('user', JSON.stringify(action.payload));
                } else {
                    state.user = null;
                    state.token = null;
                }
                state.error = null;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = action.payload ? action.payload : null;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.error = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer; 