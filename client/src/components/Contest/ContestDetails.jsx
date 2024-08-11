import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ContestDetails.css";
import Navbar from "../Topbar/Navbar";

const ContestDetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const fetchContest = async () => {
      const response = await axios.get(`http://localhost:6001/contest/${id}`);
      setContest(response.data);
    };
    fetchContest();
  }, [id]);


  return (
    <div>
   
      <div className="contest-details-page">
        <div className="contest-details-container">
          <h2 className="contest-title">{contest.title}</h2>
          <p><strong>Time Limit:</strong> {contest.timeLimit} minutes</p>
          <p><strong>Start Time:</strong> {new Date(contest.startTime).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(contest.endTime).toLocaleString()}</p>
          
          <h3>Questions:</h3>
          <ul className="questions-list">
            {contest.questions.map((question) => (
              <li key={question._id}>{question.title}</li>
            ))}
          </ul>

          <h3>Leaderboard:</h3>
          <ul className="leaderboard">
            {contest.leaderboard && contest.leaderboard.length > 0 ? (
              contest.leaderboard.map((entry, index) => (
                <li key={entry.user._id} className="leaderboard-entry">
                  <span>{index + 1}. {entry.user.username}</span>
                  <span>Score: {entry.score}</span>
                </li>
              ))
            ) : (
              <p>No scores yet!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
