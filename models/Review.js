import { DataTypes, Model } from "sequelize";
import connection from "../config/database.js";

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT },
  },
  {
    sequelize: connection,
    modelName: "Review",
    tableName: 'reviews',
    freezeTableName: true,
  }
);

export default Review;