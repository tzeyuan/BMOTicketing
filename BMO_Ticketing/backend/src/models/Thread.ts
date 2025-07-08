import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Thread extends Model {}

Thread.init(
  {
    communityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Thread",
    tableName: "threads",
    timestamps: true,
  }
);

export default Thread;
