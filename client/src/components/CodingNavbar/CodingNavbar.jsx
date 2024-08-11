import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CodingNavbar.css";

const CodingNavbar = ({ contestTitle, timeLimit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Initialize timeLeft in seconds

  useEffect(() => {
    // Convert timeLimit to seconds when the component mounts or timeLimit changes
    setTimeLeft(timeLimit * 60);
  }, [timeLimit]);

  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          handleSubmit(); // Submit when time is up
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const handleSubmit = () => {
    // Implement your submission logic here
    console.log("Submitting code...");
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
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </nav>
  );
};

export default CodingNavbar;
