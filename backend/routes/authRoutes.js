import express from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role, classOrSemester = '', subjects = [] } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required.' });
    }

    if (!['student', 'mentor'].includes(role)) {
      return res.status(400).json({ message: 'Role must be student or mentor.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const normalizedSubjects = Array.isArray(subjects)
      ? subjects
      : subjects.split(',').map((subject) => subject.trim()).filter(Boolean);

    const user = await User.create({ name, email, password, role, classOrSemester, subjects: normalizedSubjects });
    res.status(201).json({ token: createToken(user._id), user: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    res.json({ token: createToken(user._id), user: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
});

router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

export default router;
