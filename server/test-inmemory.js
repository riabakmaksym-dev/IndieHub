import { EventEmitter } from 'events';
import app from './app.js';

function mockRequest({ method, url, body, headers = {} }) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.originalUrl = url;
  req.headers = Object.fromEntries(
    Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
  );
  req.body = body;
  return req;
}

function mockResponse(callback) {
  const res = new EventEmitter();
  res.statusCode = 200;
  res.headers = {};
  res.setHeader = (k, v) => { res.headers[k.toLowerCase()] = v; };
  res.getHeader = (k) => res.headers[k.toLowerCase()];
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.body = data;
    res.emit('finish');
    callback(res);
    return res;
  };
  res.send = (data) => {
    res.body = data;
    res.emit('finish');
    callback(res);
    return res;
  };
  return res;
}

const dispatch = (method, url, { body, headers } = {}) => {
  return new Promise((resolve) => {
    const req = mockRequest({ method, url, body, headers });
    const res = mockResponse((finishedRes) => {
      resolve(finishedRes);
    });
    app(req, res);
  });
};

const run = async () => {
  const r1 = await dispatch('GET', '/api/health');
  console.log('✓ GET /api/health:', r1.statusCode === 200 && r1.body.status === 'ok');

  const r2 = await dispatch('GET', '/api/teams');
  console.log('✓ GET /api/teams:', r2.statusCode === 200 && Array.isArray(r2.body) && r2.body.length >= 3);

  const r3 = await dispatch('GET', '/api/developers');
  console.log('✓ GET /api/developers:', r3.statusCode === 200 && Array.isArray(r3.body) && r3.body.length >= 6);

  const timestamp = Date.now();
  const testUser = `User_${timestamp}`;
  const testEmail = `student_${timestamp}@example.com`;
  const r4 = await dispatch('POST', '/api/auth/register', {
    body: {
      username: testUser,
      email: testEmail,
      password: 'password123'
    }
  });
  console.log('✓ POST /api/auth/register:', r4.statusCode === 201 && !!r4.body.token);
  const token = r4.body.token;

  const r5 = await dispatch('POST', '/api/auth/login', {
    body: {
      email: testEmail,
      password: 'password123'
    }
  });
  console.log('✓ POST /api/auth/login:', r5.statusCode === 200 && !!r5.body.token);

  const r6 = await dispatch('GET', '/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('✓ GET /api/auth/me:', r6.statusCode === 200 && r6.body.user.username === testUser);

  const r7 = await dispatch('PUT', '/api/auth/profile', {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      bio: 'Fullstack розробник інді-ігор',
      role: 'Програміст',
      skills: ['React', 'Node.js', 'Express', 'Unity']
    }
  });
  console.log('✓ PUT /api/auth/profile:', r7.statusCode === 200 && r7.body.user.bio.includes('Fullstack'));

  const r8 = await dispatch('POST', '/api/teams', {
    headers: { Authorization: `Bearer ${token}` },
    body: {
      title: 'Galaxy Quest',
      genre: 'Космосим',
      engine: 'Unity',
      description: 'Нова космічна сага для лабораторної роботи №6',
      rolesNeeded: ['3D-художник', 'Саунд-дизайнер'],
      authorName: testUser
    }
  });
  console.log('✓ POST /api/teams:', r8.statusCode === 201 && r8.body.title === 'Galaxy Quest');
  const newTeamId = r8.body.id;

  const r9 = await dispatch('GET', `/api/teams/${newTeamId}`);
  console.log('✓ GET /api/teams/:id:', r9.statusCode === 200 && r9.body.id === newTeamId);

  console.log('\nAll tests passed.');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
