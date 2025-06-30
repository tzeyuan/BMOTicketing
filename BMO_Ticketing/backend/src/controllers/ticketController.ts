import { Request, Response } from "express";
import Ticket from "../models/Ticket";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { userId, event, date, ticketType, qrCode } = req.body;
    const ticket = await Ticket.create({ userId, event, date, ticketType, qrCode });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Failed to store ticket", error: err });
  }
};

export const getUserTickets = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const tickets = await Ticket.findAll({ where: { userId } });
  res.json(tickets);
};
