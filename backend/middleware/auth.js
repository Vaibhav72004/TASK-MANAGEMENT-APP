import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Authorization token missing' });

    const payload = jwt.verify(token, config.jwtSecret);
    req.user = { id: payload.id };
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
