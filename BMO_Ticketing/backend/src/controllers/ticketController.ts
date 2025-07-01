import { Request, Response } from "express";
import Ticket from "../models/Ticket";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { userId, event, date, ticketType, qrCode } = req.body;

    if (!userId || !event || !date || !ticketType || !qrCode) {
      return res.status(400).json({ message: "Missing ticket fields" });
    }

    const ticket = await Ticket.create({
      userId,
      event,
      date,
      ticketType,
      qrCode,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error("Ticket creation error:", error);
    res.status(500).json({ message: "Failed to save ticket" });
  }
};

export const getTicketsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.findAll({ where: { userId } });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};
