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

// All routes require authentication
router.use(auth);

// Admin routes
router.post('/', isAdmin, setCustomPrice);
router.get('/all', isAdmin, getAllCustomPrices);
router.delete('/:userId/:productId', isAdmin, deleteCustomPrice);

// User routes
router.get('/user/:userId', getUserCustomPrices);
router.get('/:userId/:productId', getCustomPrice);

module.exports = router; 