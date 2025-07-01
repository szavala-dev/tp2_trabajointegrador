import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roles.js';

export default function createGenreRoutes({ genreController }) {
  const router = express.Router();
  router.post(
    '/',
    authenticateToken,
    authorizeRole('admin'),
    [body('name').notEmpty().withMessage('El nombre es obligatorio')],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    genreController.create
  );
  router.put('/:id', authenticateToken, authorizeRole('admin'), genreController.update);
  router.delete('/:id', authenticateToken, authorizeRole('admin'), genreController.delete);
  router.get('/', genreController.getAll);
  return router;
}
