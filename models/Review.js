import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";

class Review extends Model {}

Review.init(
  {
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT },
  },
  {
    sequelize: connection,
    modelName: "Review",
  }
);

export default Review;