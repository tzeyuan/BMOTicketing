import { Request, Response } from "express";
import Merchandise from "../models/Merchandise";

// Create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, image, description } = req.body;
    const product = await Merchandise.create({ name, image, description });
    res.status(201).json(product);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Get all products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Merchandise.findAll({ order: [["createdAt", "DESC"]] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    const product = await Merchandise.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update({ name, image, description });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Merchandise.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
