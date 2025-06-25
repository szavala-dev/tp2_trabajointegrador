import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

export default function createReviewRoutes({ reviewController }) {
  const router = express.Router();
  router.post('/books/:bookId/reviews', authenticateToken, reviewController.createReview);
  router.get('/books/:bookId/reviews', reviewController.getBookReviews);
  router.put('/reviews/:reviewId', authenticateToken, reviewController.updateReview);
  router.delete('/reviews/:reviewId', authenticateToken, reviewController.deleteReview);
  return router;
}
