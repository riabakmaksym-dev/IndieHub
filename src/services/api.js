import initialTeams from '../data/teams';
import initialDevelopers from '../data/developers';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const STORAGE_KEYS = {
  TEAMS: 'indiehub_teams',
  DEVELOPERS: 'indiehub_developers',
  USERS: 'indiehub_users',
  TOKEN: 'indiehub_token',
  CURRENT_USER: 'indiehub_current_user'
};

const initLocalData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(initialTeams));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DEVELOPERS)) {
    localStorage.setItem(STORAGE_KEYS.DEVELOPERS, JSON.stringify(initialDevelopers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const demoUsers = [
      {
        id: 'user-demo-1',
        email: 'test@example.com',
        password: 'password123',
        username: 'MaxRyabak',
        bio: 'Інді-розробник, люблю Unity та pixel-art.',
        skills: ['Unity', 'C#', 'Game Design'],
        role: 'Програміст'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(demoUsers));
  }
};

initLocalData();

const getHeaders = (isAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (isAuth) {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

const isServerDown = (res) => {
  return res.status === 502 || res.status === 503 || res.status === 504;
};

const localFallback = {
  getTeams() {
    const data = localStorage.getItem(STORAGE_KEYS.TEAMS);
    return JSON.parse(data || '[]');
  },

  getTeamById(id) {
    const teams = this.getTeams();
    const team = teams.find((t) => String(t.id) === String(id));
    if (!team) throw new Error('Команду не знайдено');
    return team;
  },

  createTeam(newTeamData) {
    const teams = this.getTeams();
    const newTeam = {
      id: Date.now().toString(),
      membersCount: 1,
      status: 'Набір',
      members: [
        {
          id: Date.now().toString(),
          name: newTeamData.authorName || 'Тімлід',
          role: 'Тімлід',
          initials: (newTeamData.authorName || 'ТВ').slice(0, 2).toUpperCase(),
          isOwner: true
        }
      ],
      ...newTeamData
    };
    teams.unshift(newTeam);
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
    return newTeam;
  },

  getDevelopers() {
    const data = localStorage.getItem(STORAGE_KEYS.DEVELOPERS);
    return JSON.parse(data || '[]');
  },

  login({ email, password }) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser || foundUser.password !== password) {
      throw new Error('Невірний email або пароль');
    }

    const token = 'jwt-token-' + Date.now();
    const userWithoutPass = { ...foundUser };
    delete userWithoutPass.password;

    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPass));

    return { token, user: userWithoutPass };
  },

  register({ username, email, password }) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Користувач з таким email вже існує');
    }

    const newUser = {
      id: 'user-' + Date.now(),
      username,
      email,
      password,
      bio: '',
      skills: ['Розробка'],
      role: 'Програміст'
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const token = 'jwt-token-' + Date.now();
    const userWithoutPass = { ...newUser };
    delete userWithoutPass.password;

    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPass));

    return { token, user: userWithoutPass };
  },

  updateProfile(updateData) {
    const current = api.getCurrentUser();
    if (!current) throw new Error('Користувач не авторизований');

    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const index = users.findIndex((u) => u.id === current.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updateData };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    const updated = { ...current, ...updateData };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
    return updated;
  }
};

export const api = {
  async getTeams(params = {}) {
    const query = new URLSearchParams();
    if (params.genre) query.append('genre', params.genre);
    if (params.engine) query.append('engine', params.engine);
    if (params.role) query.append('role', params.role);
    if (params.status) query.append('status', params.status);
    if (params.q) query.append('q', params.q);

    const queryString = query.toString();
    const url = `${API_BASE_URL}/teams${queryString ? `?${queryString}` : ''}`;

    try {
      const res = await fetch(url);
      if (isServerDown(res)) {
        return localFallback.getTeams();
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Помилка сервера (${res.status})`);
      }
      return await res.json();
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        return localFallback.getTeams();
      }
      throw err;
    }
  },

  async getTeamById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/teams/${id}`);
      if (isServerDown(res)) {
        return localFallback.getTeamById(id);
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Помилка сервера (${res.status})`);
      }
      return await res.json();
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        return localFallback.getTeamById(id);
      }
      throw err;
    }
  },

  async createTeam(newTeamData) {
    try {
      const res = await fetch(`${API_BASE_URL}/teams`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(newTeamData)
      });
      if (isServerDown(res)) {
        return localFallback.createTeam(newTeamData);
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Помилка сервера (${res.status})`);
      }
      return await res.json();
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        return localFallback.createTeam(newTeamData);
      }
      throw err;
    }
  },

  async getDevelopers(params = {}) {
    const query = new URLSearchParams();
    if (params.role) query.append('role', params.role);
    if (params.skill) query.append('skill', params.skill);
    if (params.q) query.append('q', params.q);

    const queryString = query.toString();
    const url = `${API_BASE_URL}/developers${queryString ? `?${queryString}` : ''}`;

    try {
      const res = await fetch(url);
      if (isServerDown(res)) {
        return localFallback.getDevelopers();
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Помилка сервера (${res.status})`);
      }
      return await res.json();
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        return localFallback.getDevelopers();
      }
      throw err;
    }
  },

  async login({ email, password }) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email, password })
      });
      if (isServerDown(res)) {
        return localFallback.login({ email, password });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Помилка сервера (${res.status})`);
      }

      if (data.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      }
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        return localFallback.login({ email, password });
      }
      throw err;
    }
  },

  async register({ username, email, password }) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ username, email, password })
      });
      if (isServerDown(res)) {
        return localFallback.register({ username, email, password });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Помилка сервера (${res.status})`);
      }

      if (data.token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      }
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        return localFallback.register({ username, email, password });
      }
      throw err;
    }
  },

  async getMe() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getHeaders(true)
      });
      if (isServerDown(res) || !res.ok) {
        return this.getCurrentUser();
      }
      const data = await res.json().catch(() => ({}));
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user));
      }
      return data.user;
    } catch {
      return this.getCurrentUser();
    }
  },

  async updateProfile(userId, updateData) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(updateData)
      });
      if (isServerDown(res)) {
        return localFallback.updateProfile(updateData);
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Помилка при оновленні профілю`);
      }
      if (data.user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.user));
      }
      return data.user || data;
    } catch (err) {
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        return localFallback.updateProfile(updateData);
      }
      throw err;
    }
  },

  getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export default api;
