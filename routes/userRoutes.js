import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roles.js';

export default function createUserRoutes({ userController }) {
  const router = express.Router();
  router.post(
    '/',
    [
      body('userName').notEmpty().withMessage('El nombre de usuario es obligatorio'),
      body('mail').isEmail().withMessage('El email debe ser válido'),
      body('pass').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    userController.create
  );
  router.get('/', authenticateToken, authorizeRole('admin'), userController.getAll);
  router.get('/profile', authenticateToken, userController.getById);
  router.put('/:id/role', authenticateToken, authorizeRole('admin'), userController.updateRole);
  return router;
}
