const { User } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.create({ userName, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};