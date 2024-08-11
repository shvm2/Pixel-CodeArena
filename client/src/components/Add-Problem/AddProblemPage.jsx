import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Topbar/Navbar";
import "./AddProblemForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProblemForm from "./AddProblemForm";

function AddProblemPage() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleProblemAdded = () => {
    toast.success("Problem added successfully!");
  };

  return (
    <>
      <div className={`main-container ${darkMode ? "dark-mode" : "light-mode"}`}>
        <h1>Add a New Problem</h1>
        <AddProblemForm onProblemAdded={handleProblemAdded} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default AddProblemPage;
