import React, { useState } from "react";
import axios from "axios";
import "./AddProblemForm.css";

function AddProblemForm({ onProblemAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleTestCaseChange = (index, type, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][type] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6001/addproblem", {
        title,
        description,
        category,
        difficulty,
        testCases,
      });
      if (response.status === 200) {
        onProblemAdded();
      } else {
        throw new Error("Failed to add problem");
      }
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-problem-form">
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Difficulty:</label>
        <input
          type="text"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Test Cases:</label>
        {testCases.map((testCase, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Input"
              value={testCase.input}
              onChange={(e) =>
                handleTestCaseChange(index, "input", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Output"
              value={testCase.output}
              onChange={(e) =>
                handleTestCaseChange(index, "output", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddTestCase}>
          Add Another Test Case
        </button>
      </div>
      <button type="submit">Add Problem</button>
    </form>
  );
}

export default AddProblemForm;
