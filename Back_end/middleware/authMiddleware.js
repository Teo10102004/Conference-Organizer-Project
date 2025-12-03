const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { auth, checkRole };
