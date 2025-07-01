import AuthService from '../services/AuthService.js';
import { errorResponse } from '../utils/errorResponse.js';

export function makeAuthController({ User, bcrypt, jwt }) {
  const authService = AuthService({ User, bcrypt, jwt });
  return {
    async register(req, res) {
      try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    },
    async login(req, res) {
      try {
        const result = await authService.login(req.body);
        res.json(result);
      } catch (err) {
        if (err.message === 'Credenciales inválidas') {
          return res.status(401).json({ error: { code: 401, message: err.message } });
        }
        errorResponse(res, err, 400);
      }
    }
  };
}
