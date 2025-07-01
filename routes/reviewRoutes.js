import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roles.js';

export default function createReviewRoutes({ reviewController }) {
  const router = express.Router();
  router.post(
    '/books/:bookId/reviews',
    authenticateToken,
    [
      body('rating').isInt({ min: 1, max: 5 }).withMessage('El rating debe ser un número entre 1 y 5'),
      body('comment').isString().trim().notEmpty().escape().withMessage('El comentario es obligatorio')
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    reviewController.create
  );
  router.get('/books/:bookId/reviews', reviewController.getBookReviews);
  router.put(
    '/reviews/:reviewId',
    authenticateToken,
    [
      body('rating').optional().isInt({ min: 1, max: 5 }),
      body('comment').optional().isString().trim().notEmpty().escape()
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    reviewController.update
  );
  router.delete('/reviews/:reviewId', authenticateToken, reviewController.delete);
  return router;
}
