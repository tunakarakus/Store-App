import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExchangeRates = createAsyncThunk(
    'currency/fetchExchangeRates',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching exchange rates from backend...');
            const response = await axios.get('http://localhost:5001/api/exchange-rates');
            console.log('Received exchange rates:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
            return rejectWithValue('Failed to fetch exchange rates');
        }
    }
);

// Simple price converter
export const convertPrice = (price, currency, exchangeRates) => {
    // If no rates or currency, return original price
    if (!exchangeRates || !currency || !exchangeRates[currency]) {
        return price.toFixed(2);
    }

    // Just multiply price by the exchange rate - that's it!
    return (price * exchangeRates[currency]).toFixed(2);
};

// Get the saved currency from localStorage or default to USD
const getSavedCurrency = () => {
    const saved = localStorage.getItem('selectedCurrency');
    return saved || 'USD';
};

const initialState = {
    selectedCurrency: getSavedCurrency(),
    exchangeRates: null,
    loading: false,
    error: null,
    lastUpdated: null
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.selectedCurrency = action.payload;
            // Save to localStorage when currency changes
            localStorage.setItem('selectedCurrency', action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExchangeRates.fulfilled, (state, action) => {
                state.loading = false;
                state.exchangeRates = action.payload.rates;
                state.lastUpdated = new Date().toISOString();
                state.error = null;
            })
            .addCase(fetchExchangeRates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer; 