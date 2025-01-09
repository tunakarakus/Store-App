const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    getAllUsers,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.get('/all', auth, isAdmin, getAllUsers);
router.put('/:id', auth, isAdmin, updateUser);
router.delete('/:id', auth, isAdmin, deleteUser);

module.exports = router; 