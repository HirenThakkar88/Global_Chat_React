// In routes/call.route.js:
import express from "express";
import { Call } from "../models/CallHistory.model.js";
const router = express.Router();

router.get("/history", async (req, res) => {
  try {
    const calls = await Call.find()
      .populate("callerId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching call history" });
  }
});

export default router;