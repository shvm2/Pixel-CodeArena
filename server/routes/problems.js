// server/routes/problems.js
import express from "express";
import ProblemDetails from "../models/ProblemDetails.js";
import Problems from "../models/ProblemsTable.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/add-problem", async (req, res) => {
  const {
    title,
    difficult,
    category,
    order,
    description,
    examples,
    constraints,
    testCases,
  } = req.body;

  const problemId = uuidv4(); // Generate a unique ID for the problem

  try {
    // Add to Problems table
    const newProblem = new Problems({
      id: problemId,
      title,
      difficult,
      category,
      order,
    });

    await newProblem.save();

    // Add to ProblemDetails table
    const newProblemDetails = new ProblemDetails({
      id: problemId,
      title,
      difficult,
      category,
      order,
      description,
      examples,
      constraints,
      testCases,
    });

    await newProblemDetails.save();

    res.status(200).json({ message: "Problem added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding problem", error });
  }
});

export default router;
