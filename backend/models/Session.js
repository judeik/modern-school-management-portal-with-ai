// ==========================================
// backend/models/Session.js
// Mongoose model for chat sessions
// ==========================================
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    history: [messageSchema],
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
