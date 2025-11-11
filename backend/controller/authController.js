import jwt from 'jsonwebtoken';
import { User } from '../model/User.js';
import { config } from '../config.js';

function signToken(userId) {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '7d' });
}

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email and password are required' });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const user = await User.create({ username, email, password });
    const token = signToken(user._id.toString());

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user._id.toString());
    return res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

