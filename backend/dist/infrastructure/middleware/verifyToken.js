"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'secret';
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded && typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
            const { id, role } = decoded;
            if (role === 'user' || role === 'doctor') {
                req.id = id;
                next();
            }
            else if (role === 'admin') {
                next();
            }
            else {
                res.status(401).json({ message: 'Unauthorized role' });
            }
        }
        else {
            res.status(401).json({ message: 'Invalid token structure' });
        }
    }
    catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.verifyToken = verifyToken;
