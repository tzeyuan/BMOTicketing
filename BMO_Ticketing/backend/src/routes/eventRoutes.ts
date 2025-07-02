import express from "express";
import {
  createEvent, getEvents, updateEvent, deleteEvent, getUsers
} from "../controllers/eventController";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/users/all", getUsers); // GET /api/events/users/all

export default router;
