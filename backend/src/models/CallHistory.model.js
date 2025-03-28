import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  callerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["missed", "accepted", "rejected"],
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  startedAt: Date,
  endedAt: Date,
}, { timestamps: true });

export const Call = mongoose.model("Call", callSchema);