import { Request, Response } from "express";
import Ticket from "../models/Ticket";

// Create a new ticket (after payment)
export const createTicket = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, event, date, ticketType, qrCode } = req.body;

    if (!userId || !event || !date || !ticketType || !qrCode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const ticket = await Ticket.create({
      userId,
      event,
      date,
      ticketType,
      qrCode,
    });

    return res.status(201).json(ticket);
  } catch (error) {
    return res.status(500).json({ message: "Failed to save ticket", error });
  }
};

// Get all tickets for a user
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
