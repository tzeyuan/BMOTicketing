import express from "express";
import { getReportSummary } from "../controllers/reportController";

const router = express.Router();
router.get("/summary", getReportSummary);
export default router;
