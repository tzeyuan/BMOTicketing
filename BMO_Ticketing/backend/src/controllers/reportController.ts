import { Request, Response } from "express";
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

    let totalSales = 0;
    let totalTickets = 0;

    const eventMap: Record<string, any> = {};

    for (const ticket of monthlyTickets) {
      const { event, date, ticketType } = ticket as any;

      const eventKey = `${event}_${date}`;

      if (!eventMap[eventKey]) {
        eventMap[eventKey] = {
          title: event,
          date,
          tickets: {},
          totalSales: 0,
        };
      }

      // Loop through each ticket type in the array
      for (const entry of ticketType) {
        const { name, quantity } = entry;
        const price = extractPriceFromLabel(name);

        if (!eventMap[eventKey].tickets[name]) {
          eventMap[eventKey].tickets[name] = { sold: 0, price };
        }

        eventMap[eventKey].tickets[name].sold += quantity;
        eventMap[eventKey].totalSales += price * quantity;
        totalSales += price * quantity;
        totalTickets += quantity;
      }
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

// Extracts price from strings ticket type
const extractPriceFromLabel = (label: string): number => {
  const match = label.match(/RM\s*(\d+)/i);
  return match ? parseFloat(match[1]) : 0;
};
