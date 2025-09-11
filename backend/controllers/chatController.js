// ==========================================
// backend/controllers/chatController.js
// Handles chatbot logic
// ==========================================
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory store for sessions
const sessions = new Map();

export const handleChat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Retrieve conversation history for session
    let history = sessions.get(sessionId) || [];

    // Push new user message
    history.push({ role: "user", content: message });

    // Ask OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful school assistant chatbot." },
        ...history,
      ],
    });

    const reply = completion.choices[0].message.content;

    // Save assistant reply in history
    history.push({ role: "assistant", content: reply });

    // Store updated history
    sessions.set(sessionId, history);

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Failed to process message" });
  }
};
