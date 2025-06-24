// tests/auth.test.js
// Pruebas de autenticación con Jest y Supertest

const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
  it('debería registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        userName: 'testuser',
        mail: 'testuser@email.com',
        pass: 'testpass123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userName', 'testuser');
  });

  it('debería loguear un usuario y devolver un token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        mail: 'testuser@email.com',
        pass: 'testpass123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
