// Controlador de autenticación con inyección de dependencias
const ALLOWED_ROLES = ['user', 'uploader', 'admin'];

export function makeAuthController({ User, bcrypt, jwt }) {
  return {
    async register(req, res) {
      try {
        const { userName, mail, pass, role } = req.body;
        let userRole = 'user';
        if (role && ALLOWED_ROLES.includes(role) && process.env.NODE_ENV === 'test') {
          userRole = role;
        }
        const hashedPass = await bcrypt.hash(pass, 10);
        const user = await User.create({ userName, mail, pass: hashedPass, role: userRole });
        res.status(201).json({ userName: user.userName, mail: user.mail, role: user.role });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
    async login(req, res) {
      try {
        const { mail, pass } = req.body;
        const user = await User.findOne({ where: { mail } });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
        const valid = await bcrypt.compare(pass, user.pass);
        if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });
        const token = jwt.sign({ id: user.id, userName: user.userName, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  };
}
