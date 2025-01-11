const Product = require('../models/Product');
const CustomPrice = require('../models/CustomPrice');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        
        // If user is authenticated, fetch their custom prices
        if (req.user) {
            const customPrices = await CustomPrice.find({ user: req.user._id });
            
            // Create a map of product ID to custom price
            const customPriceMap = new Map(
                customPrices.map(cp => [cp.product.toString(), cp.price])
            );
            
            // Add custom prices to products if they exist
            const productsWithCustomPrices = products.map(product => {
                const customPrice = customPriceMap.get(product._id.toString());
                if (customPrice !== undefined) {
                    return {
                        ...product.toObject(),
                        standardPrice: product.price,
                        price: customPrice
                    };
                }
                return product.toObject();
            });
            
            return res.json(productsWithCustomPrices);
        }
        
        // For unauthenticated users, just return the products
        res.json(products.map(product => product.toObject()));
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get single product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If user is authenticated, check for custom price
        if (req.user) {
            const customPrice = await CustomPrice.findOne({
                user: req.user._id,
                product: product._id
            });

            if (customPrice) {
                return res.json({
                    ...product.toObject(),
                    standardPrice: product.price,
                    price: customPrice.price
                });
            }
        }

        // For unauthenticated users, just return the product
        res.json(product.toObject());
    } catch (error) {
        console.error('Error in getProduct:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create product (admin only)
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Also delete any custom prices for this product
        await CustomPrice.deleteMany({ product: req.params.id });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}; 