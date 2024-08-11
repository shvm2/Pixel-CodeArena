import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ContestPage.css"; // Import the CSS for styling

const ContestPage = () => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(`http://localhost:6001/contest/${id}`);
        setContest(response.data);
        if (response.data.questions.length > 0) {
          setCurrentQuestion(response.data.questions[0]);
        }
      } catch (error) {
        console.error('Error fetching contest:', error);
      }
    };
    fetchContest();
  }, [id]);

  return (
    <div className="contest-page">
      {contest ? (
        <div className="contest-details">
          <h1>{contest.title}</h1>
          <p><strong>Time Limit:</strong> {contest.timeLimit} minutes</p>
          <p><strong>Start Time:</strong> {new Date(contest.startTime).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(contest.endTime).toLocaleString()}</p>
          {currentQuestion ? (
            <div className="question-container">
              <h2>{currentQuestion.title}</h2>
              <p>{currentQuestion.description}</p>
              {/* Add code editor or input area here */}
            </div>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
};

export default ContestPage;
