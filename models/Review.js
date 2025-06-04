import { DataTypes, Model } from "sequelize";

class Review extends Model {}

User.init(
  {
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    },
  {
    sequelize: connection,
    modelName: "Review",
  }
);

export default Review;
