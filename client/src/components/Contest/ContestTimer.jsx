import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ContestTimer.css";

const ContestTimer = () => {
  const { id } = useParams(); // Get the contest ID from the URL
  const [contest, setContest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(`http://localhost:6001/contest/${id}`);
        setContest(response.data);
        // Assuming you start the timer when contest starts
        const now = new Date();
        const startTime = new Date(response.data.startTime);
        const endTime = new Date(response.data.endTime);
        const duration = Math.max(0, Math.floor((endTime - now) / 1000));
        setTimeLeft(duration);
        setCurrentQuestion(response.data.questions[0]); // Load the first question
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
    };
    fetchContest();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!contest || !currentQuestion) return <div>Loading...</div>;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="contest-timer">
      <h1>{contest.title}</h1>
      <p><strong>Time Left:</strong> {formatTime(timeLeft)}</p>
      <div className="question">
        <h2>{currentQuestion.title}</h2>
        {/* Display the coding question here */}
      </div>
    </div>
  );
};

export default ContestTimer;
