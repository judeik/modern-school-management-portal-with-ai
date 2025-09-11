// @ts-nocheck
// ==========================================
// backend/controllers/chatController.js
// Handles chatbot logic with MongoDB sessions
// ==========================================
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import crypto from "crypto";
import Session from "../models/Session.js";

export const handleChat = async (req, res) => {
  try {
    let { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    let session = await Session.findOne({ sessionId });
    if (!session) {
      session = new Session({ sessionId, history: [] });
    }

    session.history.push({ role: "user", content: message });

    if (session.history.length > 30) {
      session.history = session.history.slice(-30);
    }

    // ✅ Create OpenAI client here, after dotenv is guaranteed loaded
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful school assistant chatbot." },
        ...session.history,
      ],
    });

    const reply = completion.choices[0].message.content;

    session.history.push({ role: "assistant", content: reply });
    await session.save();

    res.json({ reply, sessionId });
  } catch (err) {
    console.error("❌ Chat error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to process message" });
  }
};
