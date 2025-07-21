import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface TicketType {
  name: string;
  sold: number;
  limit: number;
}

class Event extends Model {
  public id!: number;
  public title!: string;
  public artist!: string;
  public price!: string;
  public venue!: string;
  public date!: string;
  public image!: string;
  public description!: string;
  public ticketTypes!: TicketType[];
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
    ticketTypes: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      get() {
        const raw = this.getDataValue("ticketTypes");
        return Array.isArray(raw) ? raw : [];
      },
      set(value: TicketType[]) {
        this.setDataValue("ticketTypes", Array.isArray(value) ? value : []);
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
