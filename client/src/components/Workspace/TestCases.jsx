import React from "react";
import "./TestCases.css"; // Importing the CSS file

const TestCases = ({ handleCompile, testCases, processing }) => {
  return (
    <div className="testcase-container">
      <div className="test-cases">
        <div className="test-cases-heading">Test Cases</div>
        {testCases.length > 0 ? (
          testCases.map((testcase, idx) => (
            <div key={idx} className="test-case">
              <div className="test-case-header">
                <span className="test-case-number">Case {idx + 1}</span>
              </div>
              <div className="test-case-content">
                <div className="testcases-input-container">
                  <p className="label">Input:</p>
                  <pre className="testcase-input">{testcase.input}</pre>
                </div>
                <div className="testcases-output-container">
                  <p className="label">Expected Output:</p>
                  <pre className="testcase-output">{testcase.output}</pre>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-test-cases">No test cases available for this problem.</p>
        )}
      </div>
      <div className="compile-btn-container">
        <button onClick={handleCompile} disabled={processing} className="compile-btn">
          {processing ? "Processing..." : "Compile and Execute"}
        </button>
      </div>
    </div>
  );
};

export default TestCases;
