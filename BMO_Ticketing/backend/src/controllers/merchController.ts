import { Request, Response } from "express";
import Merchandise from "../models/Merchandise";

export const getAllMerch = async (req: Request, res: Response) => {
  const merch = await Merchandise.findAll();
  res.json(merch);
};

export const getMerchById = async (req: Request, res: Response) => {
  const merch = await Merchandise.findByPk(req.params.id);
  if (!merch) return res.status(404).json({ message: "Not found" });
  res.json(merch);
};
