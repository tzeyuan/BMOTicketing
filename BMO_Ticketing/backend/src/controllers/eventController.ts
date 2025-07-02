import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to create event", error: err });
  }
};

export const getEvents = async (_: Request, res: Response) => {
  const events = await Event.findAll();
  res.json(events);
};

export const getEventById = async (req: Request, res: Response) => {
  const event = await Event.findByPk(req.params.id);
  event ? res.json(event) : res.status(404).json({ message: "Event not found" });
};

export const updateEvent = async (req: Request, res: Response) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  await event.update(req.body);
  res.json(event);
};

export const deleteEvent = async (req: Request, res: Response) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  await event.destroy();
  res.status(204).send();
};
