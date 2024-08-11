import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateContest.css";
import Navbar from "../Topbar/Navbar";

const CreateContest = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(""); // Single question ID
  const [timeLimit, setTimeLimit] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:6001/problemsTable"); // Fetch questions
        setQuestions(response.data.data || response.data); // Handle response format
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contestData = {
      title,
      questionId: selectedQuestion, // Store the selected question ID
      timeLimit,
      startTime,
      endTime,
    };

    try {
      await axios.post("http://localhost:6001/contest/create", contestData);
      alert("Contest created successfully!");
    } catch (error) {
      alert("Error creating contest");
    }
  };

  return (
    <div>
      
      <div className="create-contest-container">
        <h2>Create New Contest</h2>
        <form onSubmit={handleSubmit} className="create-contest-form">
          <div className="form-group">
            <label>Contest Title</label>
            <input
              type="text"
              placeholder="Enter contest title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Question</label>
            <select
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)} // Handle single selection
              required
            >
              <option value="" disabled>Select a question</option>
              {questions.map((question) => (
                <option key={question.id} value={question.id}>
                  {question.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Time Limit (minutes)</label>
            <input
              type="number"
              placeholder="Enter time limit"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="create-contest-button">
            Create Contest
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContest;
