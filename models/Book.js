import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";

class Book extends Model {}

Book.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    fileUrl: { type: DataTypes.STRING }, // Ruta del archivo subido
    coverUrl: { type: DataTypes.STRING }, // Ruta de la portada
  },
  {
    sequelize: connection,
    modelName: "Book",
  }
);

export default Book;