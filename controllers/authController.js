import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV_VARIABLES } from '../config/config.js';

export async function register(req, res) {
  try {
    const { userName, mail, pass } = req.body;
    const hashedPass = await bcrypt.hash(pass, 10);
    const user = await User.create({ userName, mail, pass: hashedPass });
    res.status(201).json({ userName: user.userName, mail: user.mail });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { mail, pass } = req.body;
    const user = await User.findOne({ where: { mail } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(pass, user.pass);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, userName: user.userName }, ENV_VARIABLES.JWT_SECRET, { expiresIn: ENV_VARIABLES.JWT_EXPIRES_IN });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}