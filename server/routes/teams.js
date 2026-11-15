import { Router } from 'express';
import storage from '../storage.js';
import { optionalAuthMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    let teams = storage.getTeams();
    const { genre, engine, role, status, q } = req.query;

    if (q) {
      const query = q.toLowerCase();
      teams = teams.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }

    if (genre) {
      teams = teams.filter((t) => t.genre === genre);
    }

    if (engine) {
      teams = teams.filter((t) => t.engine === engine);
    }

    if (role) {
      teams = teams.filter(
        (t) =>
          (t.rolesNeeded && t.rolesNeeded.includes(role)) ||
          t.neededRole === role
      );
    }

    if (status) {
      teams = teams.filter((t) => t.status === status);
    }

    return res.json(teams);
  } catch {
    return res.status(500).json({ error: 'Помилка сервера при отриманні списку команд' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const team = storage.findTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Команду не знайдено' });
    }
    return res.json(team);
  } catch {
    return res.status(500).json({ error: 'Помилка при отриманні деталей команди' });
  }
});

router.post('/', optionalAuthMiddleware, (req, res) => {
  try {
    const {
      title,
      genre,
      engine,
      description,
      rolesNeeded,
      neededRole,
      communicationUrl,
      authorName,
      ownerId
    } = req.body;

    if (!title || !genre || !engine) {
      return res.status(400).json({ error: 'Поля назва, жанр та рушій є обовʼязковими' });
    }

    const creatorName = authorName || (req.user ? req.user.username : 'Тімлід');
    const creatorId = ownerId || (req.user ? req.user.id : 'user-' + Date.now());

    const newTeam = {
      id: Date.now().toString(),
      title,
      genre,
      engine,
      category: `${genre.toUpperCase()} • ${engine.toUpperCase()}`,
      description: description || 'Створення нової гри.',
      rolesNeeded: Array.isArray(rolesNeeded) && rolesNeeded.length ? rolesNeeded : [neededRole || 'Програміст'],
      neededRole: neededRole || (Array.isArray(rolesNeeded) ? rolesNeeded[0] : 'Програміст'),
      membersCount: 1,
      status: 'Набір',
      communicationUrl: communicationUrl || '',
      ownerId: creatorId,
      authorName: creatorName,
      members: [
        {
          id: 'm-' + Date.now(),
          name: creatorName,
          role: 'Тімлід',
          initials: creatorName.slice(0, 2).toUpperCase(),
          isOwner: true
        }
      ],
      createdAt: new Date().toISOString()
    };

    const created = storage.createTeam(newTeam);
    return res.status(201).json(created);
  } catch {
    return res.status(500).json({ error: 'Помилка сервера при створенні команди' });
  }
});

export default router;
