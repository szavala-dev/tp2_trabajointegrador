import express from 'express';
import { body, validationResult } from 'express-validator';
import * as genreController from '../controllers/genreController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roles.js';

const router = express.Router();

// Validación para crear género
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
  genreController.createGenre
);

// Solo admin puede actualizar o eliminar géneros
router.put('/:id', authenticateToken, authorizeRole('admin'), genreController.updateGenre);
router.delete('/:id', authenticateToken, authorizeRole('admin'), genreController.deleteGenre);

// GET público
router.get('/', genreController.getGenres);

export default router;