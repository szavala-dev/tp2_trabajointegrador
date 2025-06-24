import express from 'express';
import { body, validationResult } from 'express-validator';
import * as bookController from '../controllers/bookController.js';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roles.js';

const router = express.Router();

// Validación para crear libro
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
  bookController.createBook
);

// Solo uploader o admin pueden actualizar/eliminar libros
router.put('/:id', authenticateToken, authorizeRole('uploader', 'admin'), bookController.updateBook);
router.delete('/:id', authenticateToken, authorizeRole('admin'), bookController.deleteBook);

// Las rutas de consulta pueden ser públicas
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

export default router;