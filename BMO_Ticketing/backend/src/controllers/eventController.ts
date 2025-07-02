import { Request, Response } from "express";
import Event from "../models/Event";
import User from "../models/User";

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to create event", error: err });
  }
};

// Get All Events
export const getEvents = async (_: Request, res: Response) => {
  const events = await Event.findAll();
  res.json(events);
};

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Event.update(req.body, { where: { id } });
  res.json({ message: "Event updated" });
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Event.destroy({ where: { id } });
  res.json({ message: "Event deleted" });
};

// Get all users
export const getUsers = async (_: Request, res: Response) => {
  const users = await User.findAll({ attributes: ["id", "username", "email", "isAdmin"] });
  res.json(users);
};
