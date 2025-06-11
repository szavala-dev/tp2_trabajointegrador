import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";

class User extends Model {}

User.init(
  {
    userName: { type: DataTypes.STRING, allowNull: false, unique: true },
    mail: { type: DataTypes.STRING, allowNull: false, unique: true },
    pass: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

export default User;