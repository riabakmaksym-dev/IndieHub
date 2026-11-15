import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import teamsRoutes from './routes/teams.js';
import developersRoutes from './routes/developers.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'IndieHub API Server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/developers', developersRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Маршрут ${req.originalUrl} не знайдено` });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутрішня помилка сервера' });
});

export default app;
