// Servicio de autenticación
export default function AuthService({ User, bcrypt, jwt }) {
  const ALLOWED_ROLES = ['user', 'uploader', 'admin'];

  async function register({ userName, mail, pass, role }) {
    let userRole = 'user';
    if (role && ALLOWED_ROLES.includes(role) && process.env.NODE_ENV === 'test') {
      userRole = role;
    }
    const hashedPass = await bcrypt.hash(pass, 10);
    const user = await User.create({ userName, mail, pass: hashedPass, role: userRole });
    return { userName: user.userName, mail: user.mail, role: user.role };
  }

  async function login({ mail, pass }) {
    const user = await User.findOne({ where: { mail } });
    if (!user) throw new Error('Usuario no encontrado');
    const valid = await bcrypt.compare(pass, user.pass);
    if (!valid) throw new Error('Contraseña incorrecta');
    const token = jwt.sign(
      { id: user.id, userName: user.userName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return { token };
  }

  return { register, login };
}
