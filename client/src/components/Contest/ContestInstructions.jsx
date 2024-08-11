import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ContestInstructions.css";
import Navbar from "../Topbar/Navbar";

const ContestInstructions = () => {
  const { id } = useParams(); // Get contest ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function

  const handleStartContest = () => {
    navigate(`/contest/${id}/coding`);
  };

  return (
    <div>
      <Navbar />
      <div className="instructions-page">
        <div className="content-wrapper">
          <h2 className="heading">Contest Instructions</h2>
          <div className="instructions-content">
            <p>
              Welcome to the contest! Please read the following instructions carefully before you start:
            </p>
            <ul className="instructions-list">
              <li>
                <strong>Code Quality:</strong> Ensure that your code is clean, well-documented, and follows the best practices.
              </li>
              <li>
                <strong>Time Limit:</strong> You must complete the contest within the allotted time. The timer will start as soon as you click "Start."
              </li>
              <li>
                <strong>Language Support:</strong> You can use multiple programming languages, including JavaScript, Python, and C++.
              </li>
              <li>
                <strong>Input/Output:</strong> Make sure your code handles all the input and output as specified in each problem statement.
              </li>
              <li>
                <strong>Submission:</strong> You can submit multiple times before the contest ends. Your best submission will be considered.
              </li>
              <li>
                <strong>Rules:</strong> No plagiarism is allowed. Any form of cheating will lead to disqualification.
              </li>
            </ul>
            <p>Good luck, and may the best coder win!</p>
          </div>
          <div className="start-button-wrapper">
            <button onClick={handleStartContest} className="start-button">
              Start Contest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestInstructions;
