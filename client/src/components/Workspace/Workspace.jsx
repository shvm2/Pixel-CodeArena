import React, { useState, useEffect } from "react";
import axios from "axios";
import Split from "react-split";
import { toast } from "react-toastify";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";

function Workspace({ problemId: propProblemId }) {
  const [details, setDetails] = useState({});
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);

  const testCases = details.testCases || [];

  useEffect(() => {
    const problemId = propProblemId || window.location.pathname.split("/").pop();

    async function fetchDetails() {
      try {
        const response = await axios.get(
          `http://localhost:6001/problem/${problemId}`
        );
        setDetails(response.data);
      } catch (error) {
        console.log("Error fetching problem details:", error);
      }
    }
    fetchDetails();
  }, [propProblemId]);

  const onChange = (data) => {
    setCode(data);
  };

  const handleCompile = async () => {
    setProcessing(true);

    // Compile and run the code against all test cases
    for (let i = 0; i < testCases.length; i++) {
      const formData = {
        language_id: 63,
        source_code: btoa(code),
        stdin: btoa(testCases[i].input),
      };

      const options = {
        method: "POST",
        url: process.env.REACT_APP_RAPID_API_URL,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
        data: formData,
      };

      try {
        const response = await axios.request(options);
        const token = response.data.token;
        await checkStatus(token, testCases[i].output);
      } catch (error) {
        console.log("Error during compilation:", error);
      }
    }

    setProcessing(false);
  };

  const checkStatus = async (token, expectedOutput) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      const statusId = response.data.status_id;
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token, expectedOutput);
        }, 2000);
        return;
      } else {
        const output = atob(response.data.stdout);

        if (output.trim() === expectedOutput.trim()) {
          toast.success("Congrats! TestCase Passed");
        } else {
          toast.error("Oops! Output Didn't Match");
        }
      }
    } catch (error) {
      console.log("Error checking status:", error);
    }
  };

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription details={details} />
      <Split className="split-vertical" direction="vertical">
        <CodeEditor onChange={onChange} />
        <TestCases
          handleCompile={handleCompile}
          testCases={testCases}
          processing={processing}
        />
      </Split>
    </Split>
  );
}

export default Workspace;
