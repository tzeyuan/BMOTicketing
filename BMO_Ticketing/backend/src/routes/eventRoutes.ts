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

router.get("/titles/list", async (req, res) => {
  try {
    const events = await import("../models/Event").then(m => m.default.findAll({
      attributes: ["title"]
    }));
    const titles = events.map(event => event.title);
    res.json(titles);
  } catch (err) {
    console.error("Failed to fetch event titles:", err);
    res.status(500).json({ message: "Failed to fetch event titles" });
  }
});

export default router;
