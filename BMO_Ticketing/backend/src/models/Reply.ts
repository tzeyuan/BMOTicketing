import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Reply extends Model {}

Reply.init(
  {
    threadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    }

  },
  {
    sequelize,
    modelName: "Reply",
    tableName: "replies",
    timestamps: true,
  }
);

export default Reply;
