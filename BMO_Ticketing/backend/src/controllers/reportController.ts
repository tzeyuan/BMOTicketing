import { Request, Response } from "express";
import Event from "../models/Event";
import Ticket from "../models/Ticket";
import { Op } from "sequelize";

export const getReportSummary = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Get all tickets purchased this month
    const monthlyTickets = await Ticket.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    // Global total
    let totalSales = 0;
    let totalTickets = 0;

    // Map event title+date to per-event breakdown
    const eventMap: Record<string, any> = {};

    for (const ticket of monthlyTickets) {
      const { event, date, ticketType, quantity } = ticket as any;

      const ticketPrice = extractPriceFromLabel(ticketType);
      const eventKey = `${event}_${date}`;

      if (!eventMap[eventKey]) {
        eventMap[eventKey] = {
          title: event,
          date,
          tickets: {},
          totalSales: 0,
        };
      }

      if (!eventMap[eventKey].tickets[ticketType]) {
        eventMap[eventKey].tickets[ticketType] = { sold: 0, price: ticketPrice };
      }

      eventMap[eventKey].tickets[ticketType].sold += quantity;
      eventMap[eventKey].totalSales += quantity * ticketPrice;
      totalSales += quantity * ticketPrice;
      totalTickets += quantity;
    }

    return res.json({
      totalSales,
      totalTickets,
      events: Object.values(eventMap),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate report", error });
  }
};

const extractPriceFromLabel = (label: string): number => {
  const match = label.match(/RM\s*(\d+)/i);
  return match ? parseFloat(match[1]) : 0;
};
