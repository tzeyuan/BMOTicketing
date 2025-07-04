import { Request, Response } from "express";
import User from "../models/User";

// GET all registered users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "isAdmin"],
    });
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};
