// tests/genres.test.js
// Pruebas de endpoints de géneros con Jest y Supertest

const request = require('supertest');
const app = require('../app');

let token;

describe('Genres Endpoints', () => {
  beforeAll(async () => {
    // Login para obtener token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ mail: 'testuser@email.com', pass: 'testpass123' });
    token = res.body.token;
  });

  it('debería crear un género', async () => {
    const res = await request(app)
      .post('/api/genres')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Novela' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Novela');
  });

  it('debería listar los géneros', async () => {
    const res = await request(app)
      .get('/api/genres');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
