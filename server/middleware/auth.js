import jwt from 'jsonwebtoken';
import storage from '../storage.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'indiehub-secret-key-2026';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Необхідна авторизація. Токен відсутній.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = storage.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Користувача за токеном не знайдено.' });
    }

    req.user = user;
    req.userId = user.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Недійсний або прострочений токен авторизації.' });
  }
};

export const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = storage.findUserById(decoded.id);
    if (user) {
      req.user = user;
      req.userId = user.id;
    }
  } catch {
    //
  }
  next();
};
