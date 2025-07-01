import express from "express";
import { createTicket, getTicketsByUser } from "../controllers/ticketController";

const router = express.Router();

// POST /api/tickets
router.post("/", createTicket); 

// GET /api/tickets/:userId
router.get("/:userId", getTicketsByUser); 

export default router;
