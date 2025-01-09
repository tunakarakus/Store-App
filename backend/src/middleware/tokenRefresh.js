const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../utils/jwt');

const tokenRefresh = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return next();
        }

        // Verify the existing token
        const decoded = verifyToken(token);
        
        // Check if token needs refresh (less than 1 hour remaining)
        const tokenExp = decoded.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        if (tokenExp - now < oneHour) {
            // Generate new token
            const newToken = generateToken(decoded.userId);
            res.setHeader('X-New-Token', newToken);
        }

        next();
    } catch (error) {
        // If token is invalid, just continue without error
        next();
    }
};

module.exports = tokenRefresh; 