import mongoose from "mongoose";
import TestCase from "./TestCases.js";

const problemDetailsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  difficult: {
    type: String,
  },
  category: {
    type: String,
  },
  order: {
    type: Number,
  },
  description: {
    type: String,
  },
  examples: {
    type: Array,
  },
  constraints: {
    type: Array,
  },
  testcases: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestCase",  // Reference to the TestCase model
  },
});

const ProblemDetails = mongoose.model("ProblemDetails", problemDetailsSchema);
export default ProblemDetails;
