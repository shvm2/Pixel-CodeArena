import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { signup, login } from "./routes/auth.js";
import { problemsTable } from "./routes/problemsTable.js";
import { problemDetails } from "./routes/problemDetails.js";
import contestRoutes from "./routes/contest.js";
import problemRoutes from "./routes/problems.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: '50mb' })); // Adjust as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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
app.use("/problems", problemRoutes);