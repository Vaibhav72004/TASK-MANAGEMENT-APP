import request from 'supertest';
import { app } from './setup.js';

async function authToken() {
  await request(app)
    .post('/api/auth/register')
    .send({ username: 'test1', email: 't1@example.com', password: 'Password123!' })
    .expect(201);
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 't1@example.com', password: 'Password123!' })
    .expect(200);
  return res.body.token;
}

describe('Task Routes', () => {
  it('rejects unauthorized access', async () => {
    await request(app).get('/api/tasks').expect(401);
  });

  it('creates, lists, updates and deletes tasks', async () => {
    const token = await authToken();

    const create = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'A task', description: 'desc' })
      .expect(201);

    const id = create.body.task._id;

    const list = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(list.body.tasks.length).toBe(1);

    const update = await request(app)
      .put(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' })
      .expect(200);
    expect(update.body.task.status).toBe('completed');

    await request(app)
      .delete(`/api/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const list2 = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(list2.body.tasks.length).toBe(0);
  });
});
