import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Ticket = sequelize.define("Ticket", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ticketType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qrCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Ticket;
