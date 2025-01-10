const CustomPrice = require('../models/CustomPrice');
const User = require('../models/User');
const Product = require('../models/Product');

// Set custom price for a user and product
const setCustomPrice = async (req, res) => {
    try {
        const { userId, productId, price } = req.body;

        // Validate user and product existence
        const [user, product] = await Promise.all([
            User.findById(userId),
            Product.findById(productId)
        ]);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update or create custom price
        const customPrice = await CustomPrice.findOneAndUpdate(
            { user: userId, product: productId },
            { price },
            { new: true, upsert: true }
        );

        res.json(customPrice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get custom prices for a specific user
const getUserCustomPrices = async (req, res) => {
    try {
        const { userId } = req.params;
        const customPrices = await CustomPrice.find({ user: userId })
            .populate('product', 'name price');
        res.json(customPrices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get custom price for specific user and product
const getCustomPrice = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const customPrice = await CustomPrice.findOne({
            user: userId,
            product: productId
        });
        res.json(customPrice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete custom price
const deleteCustomPrice = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        await CustomPrice.findOneAndDelete({
            user: userId,
            product: productId
        });
        res.json({ message: 'Custom price deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all custom prices (admin only)
const getAllCustomPrices = async (req, res) => {
    try {
        const customPrices = await CustomPrice.find()
            .populate('user', 'name email')
            .populate('product', 'name price');
        res.json(customPrices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    setCustomPrice,
    getUserCustomPrices,
    getCustomPrice,
    deleteCustomPrice,
    getAllCustomPrices
}; 