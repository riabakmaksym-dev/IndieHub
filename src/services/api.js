import initialTeams from '../data/teams';
import initialDevelopers from '../data/developers';

const STORAGE_KEYS = {
  TEAMS: 'indiehub_teams',
  DEVELOPERS: 'indiehub_developers',
  USERS: 'indiehub_users',
  CURRENT_USER: 'indiehub_current_user',
  TOKEN: 'indiehub_token'
};

const initializeStorage = () => {
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

initializeStorage();

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getTeams() {
    await delay();
    const data = localStorage.getItem(STORAGE_KEYS.TEAMS);
    return JSON.parse(data || '[]');
  },

  async getTeamById(id) {
    await delay();
    const teams = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS) || '[]');
    const team = teams.find((t) => String(t.id) === String(id));
    if (!team) throw new Error('Команду не знайдено');
    return team;
  },

  async createTeam(newTeamData) {
    await delay(400);
    const teams = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAMS) || '[]');
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

  async getDevelopers() {
    await delay();
    const data = localStorage.getItem(STORAGE_KEYS.DEVELOPERS);
    return JSON.parse(data || '[]');
  },

  async login({ email, password }) {
    await delay(400);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser || foundUser.password !== password) {
      throw new Error('Невірний email або пароль');
    }

    const token = 'fake-jwt-token-' + Date.now();
    const userWithoutPass = { ...foundUser };
    delete userWithoutPass.password;

    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPass));

    return { token, user: userWithoutPass };
  },

  async register({ username, email, password }) {
    await delay(500);
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

    const token = 'fake-jwt-token-' + Date.now();
    const userWithoutPass = { ...newUser };
    delete userWithoutPass.password;

    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPass));

    return { token, user: userWithoutPass };
  },

  async updateProfile(userId, updateData) {
    await delay(300);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) throw new Error('Користувача не знайдено');

    users[index] = { ...users[index], ...updateData };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const userWithoutPass = { ...users[index] };
    delete userWithoutPass.password;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPass));

    return userWithoutPass;
  },

  getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};