import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ResultPage.css"; // Custom styling for the result page

const ResultPage = () => {
  const { id } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:6001/contest/${id}/leaderboard`);
        setLeaderboard(response.data.leaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, [id]);

  return (
    <div className="result-page">
      <h1>Contest Results</h1>
      <div className="leaderboard">
        {leaderboard.map((entry) => (
          <div key={entry.rank} className="leaderboard-entry">
            <div className="rank">#{entry.rank}</div>
            <div className="username">{entry.username}</div>
            <div className="stats">
              <div className="test-cases">
                {entry.testCasesPassed}/{entry.totalTestCases} Test Cases Passed
              </div>
              <div className="score">Score: {entry.score.toFixed(2)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
