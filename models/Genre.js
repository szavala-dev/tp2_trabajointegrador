import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";

class Genre extends Model {}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
  },
  {
    sequelize: connection,
    modelName: "Genre",
    tableName: 'genres',
    freezeTableName: true,
  }
);

export default Genre;