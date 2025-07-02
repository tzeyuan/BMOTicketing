import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Event extends Model {}

Event.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  price: DataTypes.STRING,
  venue: DataTypes.STRING,
  date: DataTypes.STRING,
  image: DataTypes.STRING,
  description: DataTypes.TEXT,
  ticketTypes: DataTypes.JSON, // store as array
}, {
  sequelize,
  modelName: "Event",
  tableName: "events",
  timestamps: true,
});

export default Event;
