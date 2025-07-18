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

    // Ticket types as array of { name: string, sold: number }
    ticketTypes: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        const raw = this.getDataValue("ticketTypes");
        return Array.isArray(raw) ? raw : [];
      },
      set(value: any) {
        // Accepts array of strings or array of { name, sold }
        const normalized = value.map((t: any) =>
          typeof t === "string" ? { name: t, sold: 0 } : t
        );
        this.setDataValue("ticketTypes", normalized);
      }
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
