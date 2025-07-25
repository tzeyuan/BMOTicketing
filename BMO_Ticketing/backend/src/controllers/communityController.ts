import Community from "../models/Community";
import JoinedCommunity from "../models/JoinedCommunity";
import { Request, Response } from "express";

export const createCommunity = async (req: Request, res: Response) => {
  try {
    const { name, topic, description } = req.body;
    const community = await Community.create({ name, topic, description });
    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({ message: "Failed to create community" });
  }
};

export const getCommunities = async (req: Request, res: Response) => {
  const communities = await Community.findAll();
  res.json(communities);
};

export const joinCommunity = async (req: Request, res: Response) => {
  const { userId, communityId } = req.body;

  const existing = await JoinedCommunity.findOne({ where: { userId, communityId } });
  if (existing) {
    return res.status(400).json({ message: "Already joined" });
  }

  const joined = await JoinedCommunity.create({ userId, communityId });
  res.status(201).json(joined);
};

export const getJoinedCommunities = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const joined = await JoinedCommunity.findAll({ where: { userId } });
  res.json(joined);
};

export const deleteCommunity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const community = await Community.findByPk(id);
    if (!community) {
      return res.status(404).json({ message: "Community not found." });
    }

    await community.destroy();

    return res.status(200).json({ message: "Community deleted successfully." });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Failed to delete community." });
  }
};

export const getCommunityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const community = await Community.findByPk(id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.json(community);
  } catch (err) {
    console.error("Error fetching community by ID:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const leaveCommunity = async (req: Request, res: Response) => {
  const { userId, communityId } = req.body;

  try {
    const record = await JoinedCommunity.findOne({ where: { userId, communityId } });
    if (!record) {
      return res.status(404).json({ message: "You are not part of this community." });
    }

    await record.destroy();
    res.status(200).json({ message: "Left the community successfully." });
  } catch (err) {
    console.error("Error leaving community:", err);
    res.status(500).json({ message: "Failed to leave community." });
  }
};