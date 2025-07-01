import UserService from '../services/UserService.js';
import { errorResponse } from '../utils/errorResponse.js';

export function makeUserController({ User, bcrypt }) {
  const userService = new UserService({ User, bcrypt });
  return {
    async create(req, res) {
      try {
        const result = await userService.createUser(req.body);
        res.status(201).json(result);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    },
    async getAll(req, res) {
      try {
        const users = await userService.getAllUserService();
        res.json(users);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    },
    async getById(req, res) {
      try {
        // Si viene de /profile, usar req.user.id; si viene con params, usar req.params.id
        const id = req.user?.id || req.params.id;
        const user = await userService.getUserServiceById(id);
        res.json(user);
      } catch (err) {
        errorResponse(res, err, 404);
      }
    },
    async updateRole(req, res) {
      try {
        const id = req.params.id;
        const { role } = req.body;
        const result = await userService.updateUserRole(id, role);
        res.json(result);
      } catch (err) {
        errorResponse(res, err, 400);
      }
    }
  };
}
