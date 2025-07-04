import { Request, Response } from "express";
import Event from "../models/Event";

// GET all events (for homepage and admin)
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err });
  }
};

// CREATE new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      artist,
      price,
      venue,
      date,
      image,
      description,
      ticketTypes,
    } = req.body;

    //Log what the backend receives
    console.log("Incoming event payload:", req.body);

    //Validate required fields
    if (
      !title || !artist || !price || !venue ||
      !date || !image || !description || !ticketTypes
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //Ensure ticketTypes is an array
    if (!Array.isArray(ticketTypes)) {
      return res.status(400).json({ message: "ticketTypes must be an array" });
    }

    const newEvent = await Event.create({
      title,
      artist,
      price,
      venue,
      date,
      image,
      description,
      ticketTypes,
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ message: "Failed to create event", error: (err as any).message });
  }
};

// UPDATE event by ID
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.update(req.body);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to update event", error: err });
  }
};

// DELETE event by ID
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event", error: err });
  }
};
