import express from 'express';

export default function createAuthRoutes({ authController }) {
  const router = express.Router();
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  return router;
}
