import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class User extends Model {}

User.init(
  {
    userName: {
      type: DataTypes.STRING,
      unique: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      mail: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

export default User;
