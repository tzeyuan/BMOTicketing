import express from "express";
import {
  createThread,
  getThreadsByCommunity,
  getThreadsByUserCommunities
} from "../controllers/threadController";

const router = express.Router();

router.post("/", createThread);
router.get("/community/:communityId", getThreadsByCommunity);
router.get("/user/:userId", getThreadsByUserCommunities);

export default router;
