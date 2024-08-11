// components/SubmitPage/SubmitPage.jsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubmitPage.css';

const SubmitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulate a successful submission with a timeout
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/contest/${id}/result`); // Redirect to result page or any other page
    }, 3000); // 3 seconds delay for demonstration

    return () => clearTimeout(timer);
  }, [id, navigate]);

  return (
    <div className="submit-page">
      <div className="submit-message">
        <h1>Submission Successful!</h1>
        <p>Your code has been successfully submitted.</p>
        <p>Redirecting you to the result page...</p>
      </div>
    </div>
  );
};

export default SubmitPage;
