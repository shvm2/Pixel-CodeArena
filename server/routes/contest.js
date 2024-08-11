import express from "express";
import Contest from "../models/Contest.js";
import ProblemDetails from "../models/ProblemDetails.js";

const router = express.Router();

// Route to get available contests
router.get("/available", async (req, res) => {
  try {
    const contests = await Contest.find({});
    
    // Fetch problem titles based on questionId
    const contestsWithTitles = await Promise.all(
      contests.map(async (contest) => {
        const problem = await ProblemDetails.findOne({ id: contest.questionId });
        return {
          ...contest.toObject(),
          questionTitle: problem ? problem.title : "Unknown Problem",
        };
      })
    );

    res.status(200).json(contestsWithTitles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contests", error: error.message });
  }
});




// Create a new contest
router.post("/create", async (req, res) => {
  const { title, questionId, timeLimit, startTime, endTime } = req.body;

  try {
    const contest = new Contest({
      title,
      questionId, // Store the problem ID as a string
      timeLimit,
      startTime,
      endTime,
    });

    await contest.save();
    res.status(201).json({ message: "Contest created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating contest", error });
  }
});

// Get contest details by ID
router.get("/:id", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    // Fetch problem details based on questionId
    const problem = await ProblemDetails.findOne({ id: contest.questionId });

    res.json({
      ...contest.toObject(),
      questionTitle: problem ? problem.title : "Unknown Problem",
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching contest details", error });
  }
});

// Fetch the problem for workspace
router.get("/problem/:questionId", async (req, res) => {
  try {
    const problem = await ProblemDetails.findOne({ id: req.params.questionId });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problem details", error });
  }
});

// Fetch the problem for workspace
router.get("/problem/:contestId", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.contestId);

    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    const problem = await ProblemDetails.findOne({ id: contest.questionId });

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching problem details", error });
  }
});

// Store the result of a contest
router.post("/:id/submit", async (req, res) => {
  const { userId, testCasesPassed, totalTestCases } = req.body;
  const { id } = req.params;

  try {
    const contest = await Contest.findById(id);

    // Calculate the score based on passed test cases
    const score = (testCasesPassed / totalTestCases) * 100;

    // Save or update the user's result
    const result = {
      userId,
      testCasesPassed,
      totalTestCases,
      score,
      date: new Date(),
    };

    contest.results.push(result);
    await contest.save();

    res.status(200).json({ message: "Result submitted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error submitting result", error });
  }
});

// Fetch the leaderboard for a contest
router.get("/:id/leaderboard", async (req, res) => {
  const { id } = req.params;

  try {
    const contest = await Contest.findById(id).populate("results.userId", "username");

    const leaderboard = contest.results
      .sort((a, b) => b.score - a.score)
      .map((result, index) => ({
        rank: index + 1,
        username: result.userId.username,
        testCasesPassed: result.testCasesPassed,
        totalTestCases: result.totalTestCases,
        score: result.score,
      }));

    res.status(200).json({ leaderboard });
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
});

export default router;
