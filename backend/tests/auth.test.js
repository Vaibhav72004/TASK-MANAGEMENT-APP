import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from './setup.js';

describe('Auth Routes', () => {
  it('registers a new user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'john', email: 'john@example.com', password: 'Password123!' })
      .expect(201);

    expect(res.body.user.email).toBe('john@example.com');
    expect(typeof res.body.token).toBe('string');
    const decoded = jwt.decode(res.body.token);
    expect(decoded).toHaveProperty('id');
  });

  it('logs in an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'jane', email: 'jane@example.com', password: 'Password123!' })
      .expect(201);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'jane@example.com', password: 'Password123!' })
      .expect(200);

    expect(res.body.user.username).toBe('jane');
    expect(res.body).toHaveProperty('token');
  });
});
