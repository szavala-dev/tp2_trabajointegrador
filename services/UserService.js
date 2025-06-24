import { User, Book } from "../models/index.js";

class UserService {
  getAllUserService = async () => {
    const users = await User.findAll({
      attributes: ["id", "userName", "mail"],
      include: {
        model: Book,
        attributes: ["title"],
      },
    });
    return users;
  };

  getUserServiceById = async (id) => {
    return await User.findByPk(id, {
      attributes: ["id", "userName", "mail"],
      include: {
        model: Book,
        attributes: ["title"],
      },
    });
  };
}

export default UserService;
