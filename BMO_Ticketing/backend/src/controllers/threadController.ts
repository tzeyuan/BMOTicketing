import { Request, Response } from "express";
import Thread from "../models/Thread";
import Reply from "../models/Reply";
import Community from "../models/Community";


// Create a new thread in a community
export const createThread = async (req: Request, res: Response) => {
  try {
    const { communityId, content } = req.body;

    if (!communityId || !content) {
      return res.status(400).json({ message: "communityId and content are required" });
    }

    const thread = await Thread.create({ communityId, content });
    res.status(201).json({ ...thread.toJSON(), replies: [] });
  } catch (err) {
    console.error("Failed to create thread:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all threads in a specific community
export const getThreadsByCommunity = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params;

    const threads = await Thread.findAll({
      where: { communityId },
      include: [{ model: Reply, as: "replies" }],
      order: [["createdAt", "DESC"]],
    });

    res.json(threads);
  } catch (err) {
    console.error("Failed to get threads by community:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Get all threads in all communities a user has joined
export const getThreadsByUserCommunities = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const communities = await Community.findAll({
      include: [{ association: "members", where: { id: userId }, attributes: [] }],
    });

    const communityIds = communities.map((c) => c.getDataValue("id"));

    const threads = await Thread.findAll({
      where: { communityId: communityIds },
      include: [{ model: Reply, as: "replies" }],
      order: [["createdAt", "DESC"]],
    });

    res.json(threads);
  } catch (err) {
    console.error("Failed to get user threads:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Post reply to a thread
export const addReply = async (req: Request, res: Response) => {
  try {
    const { threadId, content } = req.body;

    if (!threadId || !content) {
      return res.status(400).json({ message: "threadId and content are required" });
    }

    const reply = await Reply.create({ threadId, content });
    res.status(201).json(reply);
  } catch (err) {
    console.error("Failed to post reply:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
