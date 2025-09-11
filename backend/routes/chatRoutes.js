// ==========================================
// backend/routes/chatRoutes.js
// Chat API routes
// ==========================================
import express from "express";
import { handleChat } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat
router.post("/", handleChat);

export default router;
