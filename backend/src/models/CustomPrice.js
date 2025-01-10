const mongoose = require('mongoose');

const customPriceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

// Compound index to ensure unique combination of user and product
customPriceSchema.index({ user: 1, product: 1 }, { unique: true });

const CustomPrice = mongoose.model('CustomPrice', customPriceSchema);

module.exports = CustomPrice; 