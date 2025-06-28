import Community from "../models/Community";
import JoinedCommunity from "../models/JoinedCommunity";

export const createCommunity = async (req, res) => {
  try {
    const { name, topic, description } = req.body;
    const community = await Community.create({ name, topic, description });
    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({ message: "Failed to create community" });
  }
};

export const getCommunities = async (req, res) => {
  const communities = await Community.findAll();
  res.json(communities);
};

export const joinCommunity = async (req, res) => {
  const { userId, communityId } = req.body;

  const existing = await JoinedCommunity.findOne({ where: { userId, communityId } });
  if (existing) {
    return res.status(400).json({ message: "Already joined" });
  }

  const joined = await JoinedCommunity.create({ userId, communityId });
  res.status(201).json(joined);
};

export const getJoinedCommunities = async (req, res) => {
  const { userId } = req.params;

  const joined = await JoinedCommunity.findAll({ where: { userId } });
  res.json(joined);
};
