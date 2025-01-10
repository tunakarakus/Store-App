import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import userReducer from '../features/userSlice';
import currencyReducer from '../features/currencySlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        users: userReducer,
        currency: currencyReducer,
    },
}); 