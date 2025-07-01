import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

// Signup Controller
export const signup = async (req: Request, res: Response) => {
  const { username, email, password, isAdmin } = req.body;
  try {
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
      isAdmin: isAdmin || false, // default to false unless explicitly set
    });

    res.status(201).json({
      message: "User registered",
      user: user.username,
      userId: user.id,
      isAdmin: user.isAdmin,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      user: user.username,
      userId: user.id,
      isAdmin: user.isAdmin,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
