// tests/reviews.test.js
// Pruebas de endpoints de reseñas con Jest y Supertest

const request = require('supertest');
const app = require('../app');

let token;
let bookId = 1; // Ajustar según el ID de un libro existente
let reviewId;

describe('Reviews Endpoints', () => {
  beforeAll(async () => {
    // Login para obtener token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ mail: 'testuser@email.com', pass: 'testpass123' });
    token = res.body.token;
  });

  it('debería crear una reseña', async () => {
    const res = await request(app)
      .post(`/api/books/${bookId}/reviews`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: 5, comment: 'Excelente libro!' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('rating', 5);
    reviewId = res.body.id;
  });

  it('debería listar las reseñas de un libro', async () => {
    const res = await request(app)
      .get(`/api/books/${bookId}/reviews`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('debería actualizar una reseña propia', async () => {
    const res = await request(app)
      .put(`/api/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: 4, comment: 'Muy bueno.' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rating', 4);
  });

  it('debería eliminar una reseña propia', async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
