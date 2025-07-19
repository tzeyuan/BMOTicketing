import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Event extends Model {}

Event.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    artist: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    venue: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.TEXT('long'), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    ticketTypes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      get() {
        const raw = this.getDataValue("ticketTypes");
        return Array.isArray(raw) ? raw : [];
      },
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "events",
    timestamps: true,
  }
);

export default Event;
