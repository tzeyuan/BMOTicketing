import { DataTypes } from "sequelize";
import sequelize from "../config/db"

const JoinedCommunity = sequelize.define("JoinedCommunity", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  communityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default JoinedCommunity;
