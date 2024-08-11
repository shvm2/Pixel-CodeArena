import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "../Workspace/CodeEditor";
import { toast } from "react-toastify";
import "./Playground.css";
function Playground() {
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const onChange = (data) => {
    setCode(data);
  };

  const handleCompile = async () => {
    setProcessing(true);

    try {
      const response = await axios.post("http://localhost:6001/get-code", {
        code,
      });

      if (response.status === 200) {
        const output = response.data.replace("Output: ", "").trim();
        setOutput(output);
        setError("");
        toast.success("Code executed successfully!");
      } else {
        setOutput("");
        setError("Execution failed");
        toast.error("Execution failed.");
      }
    } catch (error) {
      console.error("Error during execution:", error);
      setError(error.message || "An unknown error occurred.");
      setOutput("");
      toast.error("Error during execution. Check console for details.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="workspace-container">
    <CodeEditor onChange={onChange} />
    <div className="output-container">
      <button onClick={handleCompile} className="compile-btn">
        Compile
      </button>
      <div className="output-tab">
        <h3>Output</h3>
        <pre>{output}</pre>
      </div>
      <div className="error-tab">
        <h3>Error</h3>
        <pre>{error}</pre>
      </div>
    </div>
  </div>
  );
}

export default Playground;
