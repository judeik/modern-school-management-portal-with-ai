// @ts-nocheck
// backend/config/db.js
import mongoose from "mongoose";

let isConnected = false; // ✅ Track connection state

const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 🔄 Handle disconnections and try reconnect
    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      console.error("⚠️ MongoDB disconnected. Attempting to reconnect...");
      setTimeout(connectDB, 5000); // Retry after 5s
    });
  } catch (err) {
    console.error(`❌ MongoDB Connection Failed: ${err.message}`);
    setTimeout(connectDB, 5000); // Retry after 5s if initial connect fails
  }
};

// ==============================
// Graceful Shutdown
// ==============================
const gracefulShutdown = async (signal) => {
  console.log(`\n⚠️  ${signal} received: closing MongoDB connection...`);
  try {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error closing MongoDB connection:", err.message);
    process.exit(1);
  }
};

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});

export default connectDB;
