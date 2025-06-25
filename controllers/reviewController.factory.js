// Controlador de reseñas con inyección de dependencias
export function makeReviewController({ Review, Book, User }) {
  return {
    async createReview(req, res, next) {
      try {
        const { bookId } = req.params;
        const { rating, comment } = req.body;
        const review = await Review.create({
          rating,
          comment,
          BookId: bookId,
          UserId: req.user.id
        });
        res.status(201).json(review);
      } catch (error) {
        next(error);
      }
    },
    async getBookReviews(req, res, next) {
      try {
        const { bookId } = req.params;
        const reviews = await Review.findAll({
          where: { BookId: bookId },
          include: [{ model: User, attributes: ['id', 'userName'] }]
        });
        res.json(reviews);
      } catch (error) {
        next(error);
      }
    },
    async updateReview(req, res, next) {
      try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const review = await Review.findOne({ where: { id: reviewId, UserId: req.user.id } });
        if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
        review.rating = rating;
        review.comment = comment;
        await review.save();
        res.json(review);
      } catch (error) {
        next(error);
      }
    },
    async deleteReview(req, res, next) {
      try {
        const { reviewId } = req.params;
        const review = await Review.findOne({ where: { id: reviewId, UserId: req.user.id } });
        if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
        await review.destroy();
        res.json({ message: 'Reseña eliminada' });
      } catch (error) {
        next(error);
      }
    }
  };
}
