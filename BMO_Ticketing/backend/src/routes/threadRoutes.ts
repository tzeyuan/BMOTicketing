import express from "express";
import {
  createThread,
  getThreadsByCommunity,
  getThreadsByUserCommunities,
  addReply,
} from "../controllers/threadController";

const router = express.Router();

router.post("/", createThread);
router.get("/community/:communityId", getThreadsByCommunity);
router.get("/user/:userId", getThreadsByUserCommunities);
router.post("/reply", addReply);

export default router;
