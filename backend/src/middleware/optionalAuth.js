const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            // No token provided, continue without user
            return next();
        }

        try {
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.userId);
            if (user) {
                req.user = user;
                req.token = token;
            }
        } catch (error) {
            // Invalid token, continue without user
            console.log('Invalid token in optional auth:', error.message);
        }
        
        next();
    } catch (error) {
        // Any other error, continue without user
        console.error('Error in optional auth:', error);
        next();
    }
};

module.exports = { optionalAuth }; 