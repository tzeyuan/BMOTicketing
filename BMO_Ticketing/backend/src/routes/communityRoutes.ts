import express from "express";
import {
  createCommunity,
  getCommunities,
  joinCommunity,
  getJoinedCommunities,
} from "../controllers/communityController";

const router = express.Router();

router.post("/", createCommunity);
router.get("/", getCommunities);
//router.post("/join", joinCommunity);
router.get("/joined/:userId", getJoinedCommunities);

export default router;
