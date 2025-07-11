// backend/controllers/merchController.ts
import { Request, Response } from "express";
import Merchandise from "../models/Merchandise";

// Get all products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Merchandise.findAll({ order: [["createdAt", "DESC"]] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch merchandise." });
  }
};

// Get single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Merchandise.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (err) {
    console.error("Fetch single product error:", err);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

// Create new product (admin only)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Optional: Admin check (requires middleware with req.user)
    // if (!req.user?.isAdmin) return res.status(403).json({ message: "Unauthorized" });

    const newItem = await Merchandise.create({ name, description, price, image });
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Failed to create merchandise." });
  }
};

// Update product by ID (admin only)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const item = await Merchandise.findByPk(id);
    if (!item) return res.status(404).json({ message: "Product not found." });

    await item.update({ name, description, price, image });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product." });
  }
};

// Delete product by ID (admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await Merchandise.findByPk(id);
    if (!item) return res.status(404).json({ message: "Product not found." });

    await item.destroy();
    res.json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product." });
  }
};
