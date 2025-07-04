import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roles.js';

export default function createBookRoutes({ bookController }) {
  const router = express.Router();
  router.post(
    '/',
    authenticateToken,
    authorizeRole('uploader', 'admin'),
    [
      body('title').notEmpty().withMessage('El título es obligatorio'),
      body('author').notEmpty().withMessage('El autor es obligatorio'),
      body('GenreId').isInt().withMessage('El género es obligatorio')
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    bookController.create
  );
  router.put('/:id', authenticateToken, authorizeRole('uploader', 'admin'), bookController.update);
  router.delete('/:id', authenticateToken, authorizeRole('admin'), bookController.delete);
  router.get('/', bookController.getAll);
  router.get('/:id', bookController.getById);
  return router;
}
