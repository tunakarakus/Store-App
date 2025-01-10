const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

router.get('/', async (req, res) => {
    try {
        // Fetch rates from the API
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        
        // Return the conversion rates directly
        res.json({ rates: response.data.conversion_rates });
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error.message);
        res.status(500).json({ message: 'Failed to fetch exchange rates' });
    }
});

module.exports = router; 