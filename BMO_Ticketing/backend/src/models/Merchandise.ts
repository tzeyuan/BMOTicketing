import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Merchandise extends Model {}

Merchandise.init({
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.TEXT('long'), allowNull: false },
}, {
  sequelize,
  modelName: "Merchandise",
  tableName: "merchandise",
  timestamps: true,
});

export default Merchandise;
