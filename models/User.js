import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";

class User extends Model {}

User.init(
  {
    userName: { type: DataTypes.STRING, allowNull: false, unique: true },
    mail: { type: DataTypes.STRING, allowNull: false, unique: true },
    pass: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('user', 'uploader', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    }
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

export default User;