import mongoose from "mongoose";

// Connects to the local MongoDB instance. No cloud account, no API key —
// this is intentionally 100% offline-capable.
export async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/broforce_dsa";

  try {
    mongoose.set("strictQuery", true);
    // Fail fast (5s) rather than mongoose's 30s default — if there's no
    // local MongoDB running, the person running this should find out in
    // seconds, not half a minute, especially when running `npm run seed`.
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`[db] MongoDB connected -> ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    console.error(
      "[db] Make sure a local MongoDB server is running. See README.md 'MongoDB Setup'."
    );
    process.exit(1);
  }
}
