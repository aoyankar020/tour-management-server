import mongoose from "mongoose";
import { Server } from "http";
import { app } from "./app";
import { envVars } from "./app/config/config";
import { seedSuperAdmin } from "./app/middleware/superAdmin";

let server: Server;

// Connect to MongoDB and start the server
const createServer = async () => {
  try {
    await mongoose.connect(envVars.DATABASE_URL);
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    // for checking connection Health
    switch (mongoose.connection.readyState) {
      case 0:
        console.log("❌ Disconnected");
        break;
      case 1:
        console.log("✅ Connected");
        break;
      case 2:
        console.log("⏳ Connecting...");
        break;
      case 3:
        console.log("🔌 Disconnecting...");
        break;
      default:
        console.log("❓ Unknown state");
    }
    server = app.listen(envVars.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

// Graceful shutdown
const handleExit = (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Shutting down...`);

  if (server) {
    server.close(() => {
      console.log("🛑 HTTP server closed.");
      mongoose.connection.close(false);
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Way-2 Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
  handleExit("unhandledRejection");
});
// Handle uncaughtException
process.on("uncaughtException", (reason) => {
  console.error("❌ uncaughtException:", reason);
  handleExit("uncaughtException");
});
// Handle termination signals
process.on("SIGINT", () => handleExit("SIGINT"));
process.on("SIGTERM", () => handleExit("SIGTERM"));

(async () => {
  await createServer();
  await seedSuperAdmin();
})();
