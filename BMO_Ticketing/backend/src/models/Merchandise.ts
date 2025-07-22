import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Merchandise extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image!: string;
  public eventTitle!: string; 
}

Merchandise.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.TEXT('long'), allowNull: false },
    eventTitle: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Merchandise",
    tableName: "merchandise",
    timestamps: true,
  }
);

export default Merchandise;
