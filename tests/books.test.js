// tests/books.test.js
// Pruebas de endpoints de libros con Jest y Supertest

const request = require('supertest');
const app = require('../app');

let token;

describe('Books Endpoints', () => {
  beforeAll(async () => {
    // Login para obtener token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ mail: 'testuser@email.com', pass: 'testpass123' });
    token = res.body.token;
  });

  it('debería crear un libro nuevo', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Libro Test',
        author: 'Autor Test',
        GenreId: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Libro Test');
  });

  it('debería listar los libros', async () => {
    const res = await request(app)
      .get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
