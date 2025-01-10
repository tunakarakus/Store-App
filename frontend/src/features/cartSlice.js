import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { fetchProducts } from './productSlice';

// Helper functions for guest cart
const getGuestCart = () => {
    try {
        const cart = localStorage.getItem('guestCart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        localStorage.removeItem('guestCart');
        return [];
    }
};

const saveGuestCart = (items) => {
    try {
        localStorage.setItem('guestCart', JSON.stringify(items));
    } catch (error) {
        console.error('Error saving guest cart:', error);
    }
};

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return getGuestCart();
            }
            const response = await api.get('/cart');
            return response.data.items || [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.message || 'Failed to fetch cart');
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, { getState, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                const currentCart = getGuestCart();
                const existingItem = currentCart.find(item => item.product === product._id);
                let newCart;
                if (existingItem) {
                    newCart = currentCart.map(item =>
                        item.product === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    newCart = [...currentCart, {
                        product: product._id,
                        quantity: 1,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl
                    }];
                }
                saveGuestCart(newCart);
                return newCart;
            }

            const response = await api.post('/cart/add', {
                productId: product._id,
                quantity: 1,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl
            });
            return response.data.items || [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.message || 'Failed to add item to cart');
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                const currentCart = getGuestCart();
                const newCart = currentCart.map(item =>
                    item.product === productId
                        ? { ...item, quantity }
                        : item
                );
                saveGuestCart(newCart);
                return newCart;
            }

            const response = await api.put('/cart/update', {
                productId,
                quantity
            });
            return response.data.items || [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.message || 'Failed to update cart item');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                const currentCart = getGuestCart();
                const newCart = currentCart.filter(item => item.product !== productId);
                saveGuestCart(newCart);
                return newCart;
            }

            const response = await api.delete(`/cart/remove/${productId}`);
            return response.data.items || [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.message || 'Failed to remove item from cart');
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                localStorage.removeItem('guestCart');
                return [];
            }

            const response = await api.delete('/cart/clear');
            return response.data.items || [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.message || 'Failed to clear cart');
        }
    }
);

export const initializeUserCart = createAsyncThunk(
    'cart/initializeUserCart',
    async ({ userId }, { getState, dispatch }) => {
        // If no userId is provided, just clear the cart
        if (!userId) {
            localStorage.removeItem('guestCart');
            return [];
        }

        const guestCart = getGuestCart();
        if (guestCart.length > 0) {
            // Add each guest cart item to the user's cart
            for (const item of guestCart) {
                await dispatch(addToCart({
                    _id: item.product,
                    name: item.name,
                    price: item.price,
                    imageUrl: item.imageUrl
                }));
            }
            // Clear the guest cart
            localStorage.removeItem('guestCart');
            return getState().cart.items;
        }
        
        // If there's no guest cart to migrate, just fetch the user's cart
        const response = await api.get('/cart');
        return response.data.items || [];
    }
);

export const refreshCart = createAsyncThunk(
    'cart/refreshCart',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return getGuestCart();
            }

            const response = await api.get('/cart');
            return response.data.items || [];
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.message || 'Failed to refresh cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        updateQuantityLocally: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.product === productId);
            if (item) {
                item.quantity = quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            })
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            })
            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                if (JSON.stringify(state.items) !== JSON.stringify(action.payload)) {
                    state.items = action.payload;
                }
                state.error = null;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.error = action.payload || 'An error occurred';
                dispatch(fetchCart());
            })
            // Remove from Cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            })
            // Clear Cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            })
            // Initialize User Cart
            .addCase(initializeUserCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initializeUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(initializeUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            })
            // Handle refreshCart
            .addCase(refreshCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(refreshCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, updateQuantityLocally } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartItemsCount = (state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer; 