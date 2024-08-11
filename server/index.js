import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { signup, login } from "./routes/auth.js";
import { problemsTable } from "./routes/problemsTable.js";
import { problemDetails } from "./routes/problemDetails.js";
import {output} from "./routes/compile.js";
import Docker from 'dockerode';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import Problems from "./models/ProblemsTable.js";
import ProblemDetails from "./models/ProblemDetails.js";
import { v4 as uuidv4 } from 'uuid';
import contestRoutes from "./routes/contest.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// DATABASE MONGODB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// AUTH
app.use("/auth/signup", signup);
app.use("/auth/login", login);
app.use("/problemsTable", problemsTable);
app.use("/problem/:id", problemDetails);
app.use("/contest", contestRoutes);
app.post('/get-code', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  const fileName = 'demo.cpp';
  const execName = 'demo';

  // Write the code to a new file
  fs.writeFile(fileName, code, (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
      return res.status(500).send(`Error writing file: ${err.message}`);
    }

    const dockerCommand = `docker run --rm -v "${process.cwd()}":/usr/src/myapp -w /usr/src/myapp gcc:latest g++ -o ${execName} ${fileName}`;

    exec(dockerCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send(`Error: ${error.message}`);
      }

      const execDockerCommand = `docker run --rm -v "${process.cwd()}":/usr/src/myapp -w /usr/src/myapp gcc:latest ./${execName}`;

      exec(execDockerCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return res.status(500).send(`Stderr: ${stderr}`);
        }
        return res.send(`Output: ${stdout}`);
      });
    });
  });
});
app.post("/addproblem", async (req, res) => {
  try {
    const { title, description, testCases, difficult, category } = req.body;
    const unq = uuidv4();

    const newProblem = new ProblemDetails({
      id: unq, 
      title,
      description,
      testCases,
    });


    const newProblemTable = new Problems({
      id: unq, 
      title,
      difficult,
      category
    })

    await newProblem.save();
    await newProblemTable.save();
    res.status(200).send("Problem added successfully");
  } catch (error) {
    console.error("Error adding problem:", error);
    res.status(500).send("Failed to add problem");
  }
});

