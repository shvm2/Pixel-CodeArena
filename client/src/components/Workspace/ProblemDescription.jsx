import React from "react";
import "./Workspace.css";
// import ProblemDetails from "../../problem.js";

function ProblemDescription({ details }) {
  return (
    <div className="problem-desc-container">
      <div className="problem-desc-heading">Description</div>
      <div className="desc-title">
        {details.order}. {details.title}
      </div>
      <div className="desc-difficult" style={{ color: "green" }}>
        {details.difficult}
      </div>
      <div className="companies-container">
        <div className="problem-companies">Companies</div>
      </div>
      <div className="problem-description">{details.description}</div>
      <div className="constraints-container">
        <div className="constraints">Constraints:</div>
        {details.constraints?.map((constraint, index) => {
          return <li key={index}>{constraint}</li>;
        })}
      </div>
    </div>
  );
}

export default ProblemDescription;
