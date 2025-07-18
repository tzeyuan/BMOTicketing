import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface TicketType {
  name: string;
  sold: number;
}

interface EventAttributes {
  id?: number;
  title: string;
  artist: string;
  price: string;
  venue: string;
  date: string;
  image: string;
  description: string;
  ticketTypes: TicketType[];
}

class Event extends Model<EventAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public artist!: string;
  public price!: string;
  public venue!: string;
  public date!: string;
  public image!: string;
  public description!: string;
  public ticketTypes!: TicketType[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


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
