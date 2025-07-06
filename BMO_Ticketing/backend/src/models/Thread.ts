import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Reply from "./Reply"; 
import Community from "./Community"; 

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

// Associations
Thread.hasMany(Reply, {
  foreignKey: "threadId",
  as: "replies",
});

Reply.belongsTo(Thread, {
  foreignKey: "threadId",
  as: "thread",
});

export default Thread;
