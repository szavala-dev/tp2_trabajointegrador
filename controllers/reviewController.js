import ReviewService from '../services/ReviewService.js';
import { errorResponse } from '../utils/errorResponse.js';

export function makeReviewController({ Review, Book, User }) {
  const reviewService = ReviewService({ Review, Book, User });
  return {
    async create(req, res) {
      try {
        const { bookId, rating, comment } = req.body;
        const userId = req.user.id;
        // Validación manual extra (además de express-validator en la ruta)
        if (!bookId || !Number.isInteger(rating) || rating < 1 || rating > 5 || !comment) {
          return res.status(400).json({ error: 'Datos de reseña inválidos' });
        }
        const result = await reviewService.createReview({ bookId, rating, comment, userId });
        res.status(201).json(result);
      } catch (err) {
        errorResponse(res, err);
      }
    },
    async getBookReviews(req, res) {
      try {
        const { bookId } = req.params;
        // Paginación: ?page=1&limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const reviews = await reviewService.getBookReviews(bookId, { page, limit });
        res.json(reviews);
      } catch (err) {
        errorResponse(res, err);
      }
    },
    async update(req, res) {
      try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;
        if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !comment) {
          return res.status(400).json({ error: 'Datos de reseña inválidos' });
        }
        const review = await reviewService.updateReview({ reviewId, rating, comment, userId });
        res.json(review);
      } catch (err) {
        errorResponse(res, err);
      }
    },
    async delete(req, res) {
      try {
        const { reviewId } = req.params;
        const userId = req.user.id;
        const result = await reviewService.deleteReview({ reviewId, userId });
        res.json(result);
      } catch (err) {
        errorResponse(res, err);
      }
    }
  };
}
