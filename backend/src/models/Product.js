const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a product description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a product price'],
            min: [0, 'Price cannot be negative'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Please provide a product image URL'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a product category'],
            trim: true,
        },
        subcategory: {
            type: String,
            required: [true, 'Please provide a product subcategory'],
            trim: true,
        },
        stock: {
            type: Number,
            required: [true, 'Please provide product stock quantity'],
            min: [0, 'Stock cannot be negative'],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 