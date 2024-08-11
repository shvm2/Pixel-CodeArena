import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CodingNavbar from "../CodingNavbar/CodingNavbar";
import Workspace from "../Workspace/Workspace";

const CodingPage = () => {
  const { id } = useParams(); // Extract contest ID from URL
  const [contestDetails, setContestDetails] = useState({});
  const [problemId, setProblemId] = useState(null);

  useEffect(() => {
    // Fetch contest details
    const fetchContestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6001/contest/${id}`);
        setContestDetails(response.data);
        setProblemId(response.data.questionId); // Set problem ID from contest details
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
    };

    fetchContestDetails();
  }, [id]);

  // Ensure the timeLimit is used correctly
  const timeLimit = contestDetails.timeLimit || 30; // Default to 30 minutes if not available

  return (
    <div className="coding-page">
      <CodingNavbar
        contestTitle={contestDetails.title || "Loading..."}
        timeLimit={timeLimit} // Use the fetched time limit
      />
      {problemId && <Workspace problemId={problemId} />}
    </div>
  );
};

export default CodingPage;
