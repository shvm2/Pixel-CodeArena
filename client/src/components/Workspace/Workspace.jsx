import React, { useState, useEffect } from "react";
import axios from "axios";
import Split from "react-split";
import { toast } from "react-toastify";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";

function Workspace() {
  const urlPathname = window.location.pathname;
  const segments = urlPathname.split("/");
  const problemId = segments[segments.length - 1];

  const [details, setDetails] = useState({});
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [testcases, setTestcases] = useState([]); // Fetch test cases dynamically

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(`http://localhost:6001/problem/${problemId}`);
        setDetails(response.data);
        setTestcases(response.data.testcases); // Set test cases from response
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  }, [problemId]);

  const onChange = (data) => {
    setCode(data);
  };

  const handleCompile = async () => {
    setProcessing(true);

    try {
      const allResults = [];

      for (const testcase of testcases) {
        const response = await axios.post("http://localhost:6001/get-code", {
          code,
        });

        if (response.status === 200) {
          const output = response.data.replace("Output: ", "").trim();

          const isPassing = output === testcase.output.trim();
          allResults.push({
            input: testcase.input,
            expected: testcase.output,
            output,
            isPassing,
          });
        } else {
          allResults.push({
            input: testcase.input,
            expected: testcase.output,
            output: "Execution failed",
            isPassing: false,
          });
        }
      }

      setTestResults(allResults);

      if (allResults.every((result) => result.isPassing)) {
        toast.success("All test cases passed!");
        setError("");
      } else {
        toast.error("Some test cases failed.");
        setError("");
      }
    } catch (error) {
      console.error("Error during execution:", error);
      setError(error.message || "An unknown error occurred.");
      toast.error("Error during execution. Check console for details.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription details={details} />
      <Split className="split-vertical" direction="vertical">
        <CodeEditor onChange={onChange} />
        <TestCases
          handleCompile={handleCompile}
          testcases={testcases}
          processing={processing}
        />
        <div className="result-container">
          <div className="output-tab">
            <h3>Test Results</h3>
            {testResults.map((result, index) => (
              <div key={index}>
                <p>Input: {result.input}</p>
                <p>Expected Output: {result.expected}</p>
                <p>Output: {result.output}</p>
                <p>Status: {result.isPassing ? "Passed" : "Failed"}</p>
              </div>
            ))}
          </div>
          <div className="error-tab">
            <h3>Error</h3>
            <pre>{error}</pre>
          </div>
        </div>
      </Split>
    </Split>
  );
}

export default Workspace;
