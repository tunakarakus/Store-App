const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { auth, isAdmin } = require('../middleware/auth');

// Routes that need user identification for custom prices
router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);

// Protected routes (admin only)
router.post('/', auth, isAdmin, createProduct);
router.put('/:id', auth, isAdmin, updateProduct);
router.delete('/:id', auth, isAdmin, deleteProduct);

module.exports = router; 