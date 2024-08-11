import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questionId: { // Changed to store a single question ID
    type: String,
    ref: "ProblemDetails",
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true, // In minutes
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const Contest = mongoose.model("Contest", contestSchema);
export default Contest;
