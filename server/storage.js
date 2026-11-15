import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialTeams, initialDevelopers, initialUsers } from './data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'db.json');

class Storage {
  constructor() {
    this.data = {
      teams: [],
      developers: [],
      users: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        if (!this.data.teams) this.data.teams = [...initialTeams];
        if (!this.data.developers) this.data.developers = [...initialDevelopers];
        if (!this.data.users) this.data.users = [...initialUsers];
      } else {
        this.data = {
          teams: [...initialTeams],
          developers: [...initialDevelopers],
          users: [...initialUsers]
        };
        this.save();
      }
    } catch {
      this.data = {
        teams: [...initialTeams],
        developers: [...initialDevelopers],
        users: [...initialUsers]
      };
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error(err);
    }
  }

  getUsers() {
    return this.data.users;
  }

  findUserById(id) {
    return this.data.users.find((u) => u.id === id);
  }

  findUserByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserByUsername(username) {
    return this.data.users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  }

  createUser(user) {
    this.data.users.push(user);
    this.save();
    return user;
  }

  updateUser(id, updateData) {
    const index = this.data.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.data.users[index] = { ...this.data.users[index], ...updateData };
    this.save();
    return this.data.users[index];
  }

  getTeams() {
    return this.data.teams;
  }

  findTeamById(id) {
    return this.data.teams.find((t) => String(t.id) === String(id));
  }

  createTeam(team) {
    this.data.teams.unshift(team);
    this.save();
    return team;
  }

  getDevelopers() {
    return this.data.developers;
  }
}

export const storage = new Storage();
export default storage;
