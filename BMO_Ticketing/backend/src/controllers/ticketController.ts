import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import Event from "../models/Event";

// validate ticketType array
const isValidTicketTypeArray = (data: any): data is { name: string; quantity: number }[] => {
  return Array.isArray(data) && data.every(t => t.name && typeof t.quantity === "number");
};

export const createTicket = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, event, date, ticketType, qrCode } = req.body;

    if (!userId || !event || !date || !ticketType || !qrCode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Ensure ticketType is an array
    if (!isValidTicketTypeArray(ticketType)) {
      return res.status(400).json({ message: "ticketType must be an array of { name, quantity }" });
    }

    // Save ticket to DB
    const ticket = await Ticket.create({
      userId,
      event,
      date,
      ticketType, // stored as array
      qrCode,
    });

    // Find matching event and update ticket sold count
    const matchedEvent = await Event.findOne({ where: { title: event, date } });
    if (matchedEvent) {
      let updatedTickets = [...matchedEvent.ticketTypes];

      ticketType.forEach((purchased: { name: string; quantity: number }) => {
        updatedTickets = updatedTickets.map((ticketObj: any) => {
          if (ticketObj.name === purchased.name) {
            return {
              ...ticketObj,
              sold: (ticketObj.sold || 0) + purchased.quantity
            };
          }
          return ticketObj;
        });
      });

      matchedEvent.ticketTypes = updatedTickets;
      await matchedEvent.save();
    }

    return res.status(201).json(ticket);
  } catch (error) {
    console.error("Error in createTicket:", error);
    return res.status(500).json({ message: "Failed to save ticket", error });
  }
};

export const getUserTickets = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const tickets = await Ticket.findAll({ where: { userId } });

    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve tickets", error });
  }
};
