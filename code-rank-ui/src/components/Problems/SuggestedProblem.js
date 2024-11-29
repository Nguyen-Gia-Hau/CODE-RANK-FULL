
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SuggestedProblem({ problems }) {
  const [suggestedProblem, setSuggestedProblem] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Function to suggest a random problem
  const suggestRandomProblem = () => {
    if (problems.length === 0) {
      alert("No problems available for suggestion.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * problems.length);
    setSuggestedProblem(problems[randomIndex]);
  };

  // Function to navigate to the suggested problem's details
  const navigateToProblemDetails = () => {
    if (suggestedProblem) {
      navigate(`/problems/${suggestedProblem.problem_id}`); // Navigate to problem details page
    }
  };

  return (
    <div className="suggested-problem">
      <button onClick={suggestRandomProblem} className="suggest-button">
        Suggest Today's Problem
      </button>

      {suggestedProblem && (
        <div className="suggested-problem-details">
          <h3>Suggested Problem</h3>
          <p><strong>Title:</strong> {suggestedProblem.title}</p>
          <p><strong>Difficulty:</strong> {suggestedProblem.difficulty}</p>
          <p><strong>Points:</strong> {suggestedProblem.point}</p>
          <p><strong>Description:</strong> {suggestedProblem.description}</p>
          <button
            onClick={navigateToProblemDetails}
            className="details-button">
            View Problem Details
          </button>
        </div>
      )}
    </div>
  );
}

export default SuggestedProblem;


