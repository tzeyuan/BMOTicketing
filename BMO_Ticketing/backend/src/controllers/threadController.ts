import { Request, Response } from "express";
import Thread from "../models/Thread";

// Create a new thread in a community
export const createThread = async (req: Request, res: Response) => {
  try {
    const { communityId, userId, title, content } = req.body;

    if (!communityId || !userId || !title || !content) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newThread = await Thread.create({ communityId, userId, title, content });
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ message: "Failed to create thread", error });
  }
};

// Get all threads in a specific community
export const getThreadsByCommunity = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params;
    const threads = await Thread.findAll({ where: { communityId } });
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch threads", error });
  }
};

// Get all threads in all communities a user has joined
export const getThreadsByUserCommunities = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const joined = await import("../models/JoinedCommunity").then(m =>
      m.default.findAll({ where: { userId } })
    );

    const communityIds = joined.map(j => j.getDataValue("communityId"));

    const threads = await Thread.findAll({
      where: {
        communityId: communityIds
      }
    });

    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch threads from joined communities", error });
  }
};
