import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import Event from "../models/Event"; 

export const createTicket = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId, event, date, ticketType, qrCode, quantity = 1 } = req.body;

    if (!userId || !event || !date || !ticketType || !qrCode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 1. Save ticket
    const ticket = await Ticket.create({
      userId,
      event,
      date,
      ticketType,
      qrCode,
    });

    // 2. Find event and update sold count
    const matchedEvent = await Event.findOne({ where: { title: event, date } });
    if (matchedEvent) {
      const updatedTickets = matchedEvent.ticketTypes.map((ticketObj: any) => {
        if (ticketObj.name === ticketType) {
          return { ...ticketObj, sold: (ticketObj.sold || 0) + quantity };
        }
        return ticketObj;
      });

      matchedEvent.ticketTypes = updatedTickets;
      await matchedEvent.save(); 
    }

    return res.status(201).json(ticket);
  } catch (error) {
    return res.status(500).json({ message: "Failed to save ticket", error });
  }
};
