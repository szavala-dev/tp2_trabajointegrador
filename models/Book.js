import { DataTypes, Model } from "sequelize";

class Book extends Model {}

User.init(
  {
    bookName: DataTypes.STRING,
    date: DataTypes.DATE,
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
  },
  {
    sequelize: connection,
    modelName: "Book",
  }
);

export default Book;
