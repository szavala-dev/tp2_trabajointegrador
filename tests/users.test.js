// tests/users.test.js
// Pruebas de endpoints de usuarios con Jest y Supertest

const request = require('supertest');
const app = require('../app');

let token;

describe('Users Endpoints', () => {
  beforeAll(async () => {
    // Login para obtener token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ mail: 'testuser@email.com', pass: 'testpass123' });
    token = res.body.token;
  });

  it('debería obtener el perfil del usuario autenticado', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userName');
  });

  it('debería actualizar la membresía del usuario', async () => {
    const res = await request(app)
      .put('/api/users/membership')
      .set('Authorization', `Bearer ${token}`)
      .send({ membership: 'premium' });
    expect([200, 204]).toContain(res.statusCode);
  });
});
