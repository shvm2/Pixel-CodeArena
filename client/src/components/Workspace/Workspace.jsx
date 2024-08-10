import React from "react";
import { useState, useEffect } from "react";
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
  const testcases = details.testcases;

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(
          `http://localhost:6001/problem/${problemId}`
        );
        setDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  }, [problemId]);

  const onChange = (data) => {
    setCode(data);
  };

  const handleCompile = () => {
    setProcessing(true);
    
    try {
      // Ensure the code being evaluated is a function that can take input and return output
      
      const input = [1, 2, 3];  // Assumes input is provided in the format needed
      const expectedOutput = "0,1";

      // Run the user's function with the input
   

      const target = 3; 

      function twoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];
          if (map.has(complement)) {
            return [map.get(complement), i];
          }
          map.set(nums[i], i);
        }
        return [];
      }
           
      
      
      const userFunction = new Function('nums', 'target', `
        // Add your code here (e.g., the twoSum function body)
        // const map = new Map();
        // for (let i = 0; i < nums.length; i++) {
        //   const complement = target - nums[i];
        //   if (map.has(complement)) {
        //     return [map.get(complement), i];
        //   }
        //   map.set(nums[i], i);
        // }
        // return [];
        ${code}
      `);
      
      // Define a test case input
     // This is the target sum
      const result = userFunction(input,target);

      // Compare result with expected output
      const resultString = result ? result.join(',') : '';
      if (JSON.stringify(resultString).trim() === JSON.stringify(expectedOutput).trim()) {
        toast.success("Congrats! Test Case Passed");
        setOutput(resultString);
      } else {
        toast.error("Oops! Output Didn't Match");
        console.log(result); setOutput(resultString);


      }
      
    } catch (error) {
      console.error("Error during evaluation:", error);
      toast.error("Error during evaluation. Check console for details.");
    } finally {
      setProcessing(false); // Stop processing after evaluation
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
        <div className="output-tab">
          <h3>Output</h3>
          <pre>{output}</pre>
        </div>
      </Split>
    </Split>
  );
}

export default Workspace;
