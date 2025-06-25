// Controlador de usuarios con inyección de dependencias
export function makeUserController({ User, bcrypt }) {
  return {
    async createUser(req, res) {
      try {
        const { userName, mail, pass } = req.body;
        const hashedPass = await bcrypt.hash(pass, 10);
        const user = await User.create({ userName, mail, pass: hashedPass });
        res.status(201).json({ userName: user.userName, mail: user.mail, role: user.role });
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({ error: 'El mail o userName ya está registrado.' });
        }
        res.status(400).json({ error: error.message || "Error desconocido" });
      }
    },
    async getUsers(req, res) {
      try {
        const users = await User.findAll({ attributes: { exclude: ['pass'] } });
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    async getProfile(req, res) {
      try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['pass'] } });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    async updateMembership(req, res) {
      try {
        const { membership } = req.body;
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        user.membership = membership;
        await user.save();
        res.json({ message: 'Membresía actualizada', membership: user.membership });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    async updateUserRole(req, res) {
      try {
        const { id } = req.params;
        const { role } = req.body;
        const validRoles = ['user', 'uploader', 'admin'];
        if (!validRoles.includes(role)) {
          return res.status(400).json({ error: 'Rol inválido' });
        }
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        user.role = role;
        await user.save();
        res.json({ message: 'Rol actualizado', role: user.role });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
}
