import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CodingNavbar.css";

const CodingNavbar = ({ contestTitle, timeLimit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState(0); // Initialize timeLeft in seconds

  useEffect(() => {
    // Load the remaining time from localStorage or set it to the initial time
    const storedTimeLeft = localStorage.getItem(`contest-${id}-time-left`);
    if (storedTimeLeft) {
      setTimeLeft(parseInt(storedTimeLeft, 10));
    } else {
      setTimeLeft(timeLimit * 60); // Initialize timeLeft in seconds
    }
  }, [id, timeLimit]);

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          handleSubmit(); // Submit when time is up
          return 0;
        }
        const newTimeLeft = prevTimeLeft - 1;
        localStorage.setItem(`contest-${id}-time-left`, newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [id]);

  const handleSubmit = () => {
    // Implement your submission logic here
    console.log("Submitting code...");
    localStorage.removeItem(`contest-${id}-time-left`); // Clear stored time on submission
    navigate(`/contest/${id}/submit`); // Redirect to submit page (you can modify this as needed)
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <nav className="coding-navbar">
      <div className="contest-title">{contestTitle}</div>
      <div className="time-left">Time Left: {formatTime(timeLeft)}</div>
      <button onClick={handleSubmit} className="submit-button1">
        Submit
      </button>
    </nav>
  );
};

export default CodingNavbar;
