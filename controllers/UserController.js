import User from '../models/User.js';
import UserService from '../services/UserService.js';

const userService = new UserService();

export async function createUser(req, res) {
  try {
    const { userName, mail, pass } = req.body;
    const user = await User.create({ userName, mail, pass });
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El mail o userName ya está registrado.' });
    }
    res.status(400).json({ error: error.message || "Error desconocido" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await userService.getAllUserService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}