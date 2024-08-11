import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Topbar/Navbar";
import "./AddProblemPage.css";

const AddProblemPage = () => {
  const [title, setTitle] = useState("");
  const [difficult, setDifficult] = useState("Easy");
  const [category, setCategory] = useState("Array");
  const [order, setOrder] = useState(1);
  const [description, setDescription] = useState("");
  const [examples, setExamples] = useState([""]);
  const [constraints, setConstraints] = useState([""]);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const handleAddProblem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:6001/problems/add-problem", {
        title,
        difficult,
        category,
        order,
        description,
        examples,
        constraints,
        testCases,
      });

      if (response.status === 200) {
        alert("Problem added successfully!");
        // Reset form fields
        setTitle("");
        setDifficult("Easy");
        setCategory("Array");
        setOrder(1);
        setDescription("");
        setExamples([""]);
        setConstraints([""]);
        setTestCases([{ input: "", output: "" }]);
      }
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  const handleExamplesChange = (index, value) => {
    const newExamples = [...examples];
    newExamples[index] = value;
    setExamples(newExamples);
  };

  const handleConstraintsChange = (index, value) => {
    const newConstraints = [...constraints];
    newConstraints[index] = value;
    setConstraints(newConstraints);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  return (
    <div className="add-problem-page">
      <Navbar />
      <div className="form-container">
        <h1>Add a New Problem</h1>
        <form onSubmit={handleAddProblem}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Difficulty</label>
            <select
              value={difficult}
              onChange={(e) => setDifficult(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Array">Array</option>
              <option value="String">String</option>
              <option value="LinkedList">LinkedList</option>
              <option value="Tree">Tree</option>
              <option value="Graph">Graph</option>
            </select>
          </div>

          <div className="form-group">
            <label>Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Examples</label>
            {examples.map((example, index) => (
              <input
                key={index}
                type="text"
                value={example}
                onChange={(e) => handleExamplesChange(index, e.target.value)}
                required
              />
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => setExamples([...examples, ""])}
            >
              Add Example
            </button>
          </div>

          <div className="form-group">
            <label>Constraints</label>
            {constraints.map((constraint, index) => (
              <input
                key={index}
                type="text"
                value={constraint}
                onChange={(e) => handleConstraintsChange(index, e.target.value)}
                required
              />
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => setConstraints([...constraints, ""])}
            >
              Add Constraint
            </button>
          </div>

          <div className="form-group">
            <label>Test Cases</label>
            {testCases.map((testCase, index) => (
              <div key={index} className="test-case">
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
                  placeholder="Expected Output"
                  value={testCase.output}
                  onChange={(e) =>
                    handleTestCaseChange(index, "output", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() =>
                setTestCases([...testCases, { input: "", output: "" }])
              }
            >
              Add Test Case
            </button>
          </div>

          <button type="submit" className="submit-button">
            Add Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProblemPage;
