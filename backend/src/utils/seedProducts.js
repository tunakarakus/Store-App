const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
    {
        name: 'Smartphone X',
        description: 'Latest smartphone with advanced features and high-performance camera',
        price: 999.99,
        imageUrl: 'https://source.unsplash.com/random/800x600/?smartphone',
        category: 'Electronics',
        stock: 50,
    },
    {
        name: 'Laptop Pro',
        description: 'Powerful laptop for professional use with high-end specifications',
        price: 1499.99,
        imageUrl: 'https://source.unsplash.com/random/800x600/?laptop',
        category: 'Electronics',
        stock: 30,
    },
    {
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with noise cancellation',
        price: 199.99,
        imageUrl: 'https://source.unsplash.com/random/800x600/?headphones',
        category: 'Electronics',
        stock: 100,
    },
    {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health monitoring capabilities',
        price: 299.99,
        imageUrl: 'https://source.unsplash.com/random/800x600/?smartwatch',
        category: 'Electronics',
        stock: 75,
    },
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log('Sample products inserted:', products.length);

        console.log('Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedProducts(); 