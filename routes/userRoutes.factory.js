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
    userController.createUser
  );
  router.get('/', authenticateToken, authorizeRole('admin'), userController.getUsers);
  router.get('/profile', authenticateToken, userController.getProfile);
  router.put('/membership', authenticateToken, userController.updateMembership);
  router.put('/:id/role', authenticateToken, authorizeRole('admin'), userController.updateUserRole);
  return router;
}
