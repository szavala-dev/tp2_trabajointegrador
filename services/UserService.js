import { User, Book } from "../models/index.js";

class UserService {
  constructor({ User, bcrypt }) {
    this.User = User;
    this.bcrypt = bcrypt;
  }

  createUser = async ({ userName, mail, pass }) => {
    const hashedPass = await this.bcrypt.hash(pass, 10);
    const user = await this.User.create({ userName, mail, pass: hashedPass });
    return { userName: user.userName, mail: user.mail, role: user.role };
  };

  getAllUserService = async () => {
    const users = await this.User.findAll({
      attributes: { exclude: ["pass"] },
      include: {
        model: Book,
        attributes: ["title"],
      },
    });
    return users;
  };

  getUserServiceById = async (id) => {
    const user = await this.User.findByPk(id, {
      attributes: { exclude: ["pass"] },
      include: {
        model: Book,
        attributes: ["title"],
      },
    });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  };

  updateUserRole = async (id, role) => {
    const validRoles = ["user", "uploader", "admin"];
    if (!validRoles.includes(role)) throw new Error("Rol inválido");
    const user = await this.User.findByPk(id);
    if (!user) throw new Error("Usuario no encontrado");
    user.role = role;
    await user.save();
    return { message: "Rol actualizado", role: user.role };
  };
}

export default UserService;
