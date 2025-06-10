import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";

class Genre extends Model {}

Genre.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize: connection,
    modelName: "Genre",
  }
);

export default Genre;