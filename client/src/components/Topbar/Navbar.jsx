
import React, { useState, useEffect } from "react";

import "./Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    window.location = "/login";
  };

  const handleAddProblem = () => {
    window.location = "/add-problem";
  };

  const handlePlayground = () =>{
    window.location = "/playground";
  };

  const handleHome = () =>{
    window.location = "/home";
  };

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


  return (
    <nav>
      <div className="navbar-container">
      <button
        className={`toggle-btn ${darkMode ? "dark-mode" : "light-mode"}`}
        onClick={handleToggle}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <button className="add-problem-btn" onClick={handleHome}>
          HOME
        </button>
        <button className="add-problem-btn" onClick={handleAddProblem}>
          ADD PROBLEM
        </button>
        <button className="add-problem-btn" onClick={handlePlayground}>
         Playground
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
