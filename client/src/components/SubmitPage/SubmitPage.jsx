import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SubmitPage.css';

const SubmitPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Simulate a successful submission with a timeout
    const timer = setTimeout(() => {
      localStorage.setItem(`submitted_${id}`, 'true'); // Mark contest as submitted
      navigate(`/home`); // Redirect to home or any other page
    }, 3000); // 3 seconds delay for demonstration

    return () => clearTimeout(timer);
  }, [id, navigate]);

  return (
    <div className="submit-page">
      <div className="submit-message">
        <h1>Submission Successful!</h1>
        <p>Your code has been successfully submitted.</p>
        <p>Redirecting you to the home page...</p>
      </div>
    </div>
  );
};

export default SubmitPage;
