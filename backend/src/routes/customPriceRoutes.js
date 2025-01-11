const express = require('express');
const router = express.Router();
const {
    setCustomPrice,
    getUserCustomPrices,
    getCustomPrice,
    deleteCustomPrice,
    getAllCustomPrices
} = require('../controllers/customPriceController');
const { auth, isAdmin } = require('../middleware/auth');

// Admin routes
router.get('/all', auth, isAdmin, getAllCustomPrices);
router.get('/user/:userId', auth, isAdmin, getUserCustomPrices);
router.post('/', auth, isAdmin, setCustomPrice);
router.delete('/:userId/:productId', auth, isAdmin, deleteCustomPrice);
router.get('/:userId/:productId', auth, isAdmin, getCustomPrice);

module.exports = router; 