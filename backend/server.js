// @ts-nocheck
// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// 1. API Routes
// ==============================
app.use("/api/chat", chatRoutes);

// ✅ 1.1 Health check route
app.get("/api/health", (req, res) => {
  const dbState = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json({
    status: "ok",
    db: dbState[mongoose.connection.readyState],
    uptime: process.uptime(),
  });
});

// ==============================
// 2. Serve Frontend Static Files
// ==============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend")));

// Fallback for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ==============================
// 3. Start Server AFTER DB Connection
// ==============================
let server; // store HTTP server instance

connectDB()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // exit if DB connection fails
  });

// ==============================
// 4. Graceful Shutdown
// ==============================
const shutdown = async (signal) => {
  console.log(`\n⚠️  ${signal} received: shutting down gracefully...`);

  if (server) {
    server.close(() => {
      console.log("🛑 HTTP server closed");
    });
  }

  try {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during shutdown:", err.message);
    process.exit(1);
  }
};

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, () => shutdown(signal));
});
