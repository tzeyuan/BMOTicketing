import { DataTypes } from "sequelize";
import sequelize from "../../config/db";

const Community = sequelize.define("Community", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Community;
