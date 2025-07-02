import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface EventAttributes {
  id?: number;
  title: string;
  artist: string;
  price: string;
  venue: string;
  date: string;
  image: string;
  description: string;
  ticketTypes: string; // comma-separated string
}

interface EventCreationAttributes extends Optional<EventAttributes, "id"> {}

class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public artist!: string;
  public price!: string;
  public venue!: string;
  public date!: string;
  public image!: string;
  public description!: string;
  public ticketTypes!: string;
}

Event.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    artist: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    venue: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    ticketTypes: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: "events", timestamps: true }
);

export default Event;
