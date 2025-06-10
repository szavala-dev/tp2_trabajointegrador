import { DataTypes, Model } from "sequelize";

class Genre extends Model {}

User.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "Genre",
  }
);

export default Genre;
