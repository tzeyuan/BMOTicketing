import express from "express";
import {
  createEvent, getEvents,getEventById, updateEvent, deleteEvent, updateTicketSales
} from "../controllers/eventController";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/purchase/:id", updateTicketSales);

export default router;
