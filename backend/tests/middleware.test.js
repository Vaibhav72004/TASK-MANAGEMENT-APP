import request from 'supertest';
import { app } from './setup.js';

describe('Auth Middleware', () => {
  it('returns 401 when no token provided', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/token/i);
  });
});
