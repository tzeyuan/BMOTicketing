import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import Event from "../models/Event";

// Local ticket interface to avoid type conflict with Sequelize
interface EventTicketType {
  name: string;
  sold: number;
  limit: number;
}

// Validate that ticketType is an array of { name, quantity }
const isValidTicketTypeArray = (
  data: any
): data is { name: string; quantity: number }[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (t) =>
        typeof t.name === "string" &&
        t.name.trim() !== "" &&
        typeof t.quantity === "number" &&
        t.quantity > 0
    )
  );
};

export const createTicket = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId, event, date, ticketType, qrCode } = req.body;

    if (!userId || !event || !date || !ticketType || !qrCode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!isValidTicketTypeArray(ticketType)) {
      return res.status(400).json({
        message: "ticketType must be an array of { name, quantity }",
      });
    }

    const matchedEvent = await Event.findOne({ where: { title: event, date } });

    if (!matchedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updatedTickets = [...(matchedEvent.ticketTypes as EventTicketType[])];

    // Check limits
    for (const purchased of ticketType) {
      const found = updatedTickets.find((t) => t.name === purchased.name);

      if (!found) {
        return res.status(400).json({
          message: `Ticket type '${purchased.name}' does not exist.`,
        });
      }

      const currentSold = found.sold || 0;
      if (currentSold + purchased.quantity > found.limit) {
        return res.status(400).json({
          message: `Not enough tickets for '${purchased.name}'. Available: ${
            found.limit - currentSold
          }`,
        });
      }
    }

    // Save ticket
    const ticket = await Ticket.create({
      userId,
      event,
      date,
      ticketType,
      qrCode,
    });

    // Update sold counts
    ticketType.forEach((purchased) => {
      const idx = updatedTickets.findIndex((t) => t.name === purchased.name);
      if (idx !== -1) {
        updatedTickets[idx].sold =
          (updatedTickets[idx].sold || 0) + purchased.quantity;
      }
    });

    matchedEvent.ticketTypes = updatedTickets;
    await matchedEvent.save();

    return res.status(201).json(ticket);
  } catch (error) {
    console.error("Error in createTicket:", error);
    return res.status(500).json({
      message: "Failed to save ticket",
      error,
    });
  }
};

export const getUserTickets = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const tickets = await Ticket.findAll({ where: { userId } });

    return res.status(200).json(tickets);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve tickets", error });
  }
};
