import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AvailableContests.css";
import Navbar from "../Topbar/Navbar";

const AvailableContests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get("http://localhost:6001/contest/available");
        setContests(response.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContests();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="contests-page">
        <div className="content-wrapper">
          <h2 className="heading">Available Contests</h2>
          {contests.length === 0 ? (
            <div className="no-contests">
              <h3>No Contests Yet!</h3>
              <p>We're currently preparing some exciting challenges. Check back soon!</p>
            </div>
          ) : (
            <ul className="contests-list">
              {contests.map((contest) => (
                <li key={contest._id} className="contest-item">
                  <Link to={`/contest/${contest._id}/instructions`} className="contest-link">
                    <h3 className="contest-title">{contest.title}</h3>
                    <p><strong>Time Limit:</strong> {contest.timeLimit} minutes</p>
                    <p><strong>Start Time:</strong> {new Date(contest.startTime).toLocaleString()}</p>
                    <p><strong>End Time:</strong> {new Date(contest.endTime).toLocaleString()}</p>
                    <p><strong>Question:</strong> {contest.questionTitle}</p> {/* Display the problem title */}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableContests;
