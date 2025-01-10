const Cart = require('../models/Cart');
const CustomPrice = require('../models/CustomPrice');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        // Fetch current prices for all items
        const customPrices = await CustomPrice.find({
            user: req.user._id,
            product: { $in: cart.items.map(item => item.product) }
        });

        // Create a map of product ID to custom price
        const customPriceMap = new Map(
            customPrices.map(cp => [cp.product.toString(), cp.price])
        );

        // Update prices in cart items
        const updatedItems = await Promise.all(cart.items.map(async (item) => {
            const product = await Product.findById(item.product);
            if (!product) return null;

            const currentPrice = customPriceMap.get(item.product.toString()) || product.price;
            
            // Update the item price if it's different
            if (item.price !== currentPrice) {
                item.price = currentPrice;
            }

            return item;
        }));

        // Filter out null items (products that no longer exist)
        cart.items = updatedItems.filter(item => item !== null);
        await cart.save();

        res.json({ items: cart.items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity, name, price, imageUrl } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });

        // Get current price (including custom price if exists)
        const customPrice = await CustomPrice.findOne({
            user: req.user._id,
            product: productId
        });

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const currentPrice = customPrice ? customPrice.price : product.price;

        if (!cart) {
            cart = await Cart.create({ 
                user: req.user._id,
                items: [{
                    product: productId,
                    quantity,
                    name,
                    price: currentPrice,
                    imageUrl
                }]
            });
        } else {
            // Check if product already exists in cart
            const existingItem = cart.items.find(item => 
                item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity || 1;
                existingItem.price = currentPrice; // Update price
            } else {
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1,
                    name,
                    price: currentPrice,
                    imageUrl
                });
            }
            await cart.save();
        }

        res.json({ items: cart.items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.items.find(item => 
            item.product.toString() === productId
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Get current price
        const customPrice = await CustomPrice.findOne({
            user: req.user._id,
            product: productId
        });

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        cartItem.quantity = quantity;
        cartItem.price = customPrice ? customPrice.price : product.price;
        await cart.save();

        res.json({ items: cart.items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => 
            item.product.toString() !== productId
        );
        await cart.save();

        res.json({ items: cart.items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();

        res.json({ items: cart.items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}; 