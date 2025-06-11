import User from '../models/User.js';

export async function createUser(req, res) {
  console.log('BODY:', req.body); // <-- Esto
  try {
    const { userName, mail, pass } = req.body;
    const user = await User.create({ userName, mail, pass });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}