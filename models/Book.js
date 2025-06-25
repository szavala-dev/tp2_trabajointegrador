import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";
import Genre from "./Genre.js";

class Book extends Model {}

Book.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize: connection,
    modelName: "Book",
    tableName: 'books',
    freezeTableName: true,
  }
);

export default Book;