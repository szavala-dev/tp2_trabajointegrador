// Servicio de reseñas
export default function ReviewService({ Review, Book, User }) {
  async function createReview({ bookId, rating, comment, userId }) {
    return await Review.create({
      rating,
      comment,
      BookId: bookId,
      UserId: userId
    });
  }

  async function getBookReviews(bookId, { page = 1, limit = 10 } = {}) {
    return await Review.findAndCountAll({
      where: { BookId: bookId },
      include: [{ model: User, attributes: ['id', 'userName'] }],
      offset: (page - 1) * limit,
      limit
    });
  }

  async function updateReview({ reviewId, rating, comment, userId }) {
    const review = await Review.findOne({ where: { id: reviewId, UserId: userId } });
    if (!review) throw new Error('Reseña no encontrada');
    review.rating = rating;
    review.comment = comment;
    await review.save();
    return review;
  }

  async function deleteReview({ reviewId, userId }) {
    const review = await Review.findOne({ where: { id: reviewId, UserId: userId } });
    if (!review) throw new Error('Reseña no encontrada');
    await review.destroy();
    return { message: 'Reseña eliminada' };
  }

  return { createReview, getBookReviews, updateReview, deleteReview };
}
