import { Router } from 'express';
import storage from '../storage.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    let developers = storage.getDevelopers();
    const { role, skill, q } = req.query;

    if (q) {
      const query = q.toLowerCase();
      developers = developers.filter(
        (dev) =>
          dev.name.toLowerCase().includes(query) ||
          dev.username.toLowerCase().includes(query)
      );
    }

    if (role) {
      developers = developers.filter(
        (dev) =>
          dev.role === role ||
          (Array.isArray(dev.roles) && dev.roles.includes(role))
      );
    }

    if (skill) {
      developers = developers.filter(
        (dev) => Array.isArray(dev.skills) && dev.skills.includes(skill)
      );
    }

    return res.json(developers);
  } catch {
    return res.status(500).json({ error: 'Помилка сервера при отриманні списку розробників' });
  }
});

export default router;
