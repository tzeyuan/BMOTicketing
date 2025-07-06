import { Request, Response } from "express";
import Thread from "../models/Thread";
import Reply from "../models/Reply";


// Create a new thread in a community
export const createThread = async (req: Request, res: Response) => {
  const { communityId, content } = req.body;

  if (!communityId || !content) {
    return res.status(400).json({ message: "communityId and content are required." });
  }

  try {
    const thread = await Thread.create({ communityId, content });
    res.status(201).json(thread);
  } catch (err) {
    console.error("Create thread error:", err);
    res.status(500).json({ message: "Failed to create thread" });
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

// Reply on other threads
export const addReply = async (req: Request, res: Response) => {
  const { threadId, content } = req.body;

  if (!threadId || !content) {
    return res.status(400).json({ message: "threadId and content are required." });
  }

  try {
    const reply = await Reply.create({ threadId, content });
    res.status(201).json(reply);
  } catch (err) {
    console.error("Failed to add reply:", err);
    res.status(500).json({ message: "Failed to add reply" });
  }
};
