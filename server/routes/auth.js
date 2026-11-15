import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import storage from '../storage.js';
import { authMiddleware, JWT_SECRET } from '../middleware/auth.js';

const router = Router();

const sanitizeUser = (user) => {
  if (!user) return null;
  const sanitized = { ...user };
  delete sanitized.password;
  return sanitized;
};

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Будь ласка, заповніть усі поля (імʼя, email, пароль)' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Пароль повинен містити щонайменше 6 символів' });
    }

    const existingByEmail = storage.findUserByEmail(email);
    if (existingByEmail) {
      return res.status(400).json({ error: 'Користувач з таким email вже існує' });
    }

    const existingByUsername = storage.findUserByUsername(username);
    if (existingByUsername) {
      return res.status(400).json({ error: 'Користувач з таким нікнеймом вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: 'user-' + Date.now(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      bio: '',
      skills: ['Розробка'],
      role: 'Програміст',
      createdAt: new Date().toISOString()
    };

    storage.createUser(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.status(201).json({
      token,
      user: sanitizeUser(newUser)
    });
  } catch {
    return res.status(500).json({ error: 'Помилка сервера при реєстрації' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Будь ласка, вкажіть email та пароль' });
    }

    const user = storage.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.json({
      token,
      user: sanitizeUser(user)
    });
  } catch {
    return res.status(500).json({ error: 'Помилка сервера при авторизації' });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  return res.json({ user: sanitizeUser(req.user) });
});

router.put('/profile', authMiddleware, (req, res) => {
  try {
    const { bio, role, skills } = req.body;
    const updateData = {};

    if (typeof bio === 'string') updateData.bio = bio;
    if (typeof role === 'string') updateData.role = role;
    if (Array.isArray(skills)) updateData.skills = skills;

    const updated = storage.updateUser(req.userId, updateData);
    if (!updated) {
      return res.status(404).json({ error: 'Користувача не знайдено' });
    }

    return res.json({ user: sanitizeUser(updated) });
  } catch {
    return res.status(500).json({ error: 'Помилка при оновленні профілю' });
  }
});

export default router;
