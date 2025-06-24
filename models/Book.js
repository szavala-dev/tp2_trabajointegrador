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
      allowNull: false,
      references: {
        model: Genre,
        key: 'id'
      }
    }
  },
  {
    sequelize: connection,
    modelName: "Book",
  }
);

export default Book;