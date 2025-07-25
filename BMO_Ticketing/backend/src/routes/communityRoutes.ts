import express from "express";
import {
  createCommunity,
  getCommunities,
  joinCommunity,
  getJoinedCommunities,
  deleteCommunity,
  leaveCommunity,
  getCommunityById,
} from "../controllers/communityController";

const router = express.Router();

router.post("/", createCommunity);
router.get("/", getCommunities);
router.post("/join", joinCommunity);
router.get("/joined/:userId", getJoinedCommunities);
router.delete("/:id", deleteCommunity);
router.delete("/leave", leaveCommunity);
router.get("/:id", getCommunityById);

export default router;
