import { DataTypes, Model } from "sequelize";

class Genre extends Model {}

User.init(
  {
    genreName: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "Genre",
  }
);

export default Genre;
