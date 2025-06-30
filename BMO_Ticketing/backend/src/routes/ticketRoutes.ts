import express from "express";
import { createTicket, getUserTickets } from "../controllers/ticketController";

const router = express.Router();

router.post("/", createTicket);
router.get("/:userId", getUserTickets);

export default router;
