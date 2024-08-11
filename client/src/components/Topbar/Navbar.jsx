import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    window.location = "/login";
  };

  return (
    <nav>
      <div className="navbar-container">
        <Link to="/home">Home</Link>
        <Link to="/contest/create">Create Contest</Link>
        <Link to="/contest/available">Available Contests</Link>
        <Link to="/problems/add-problem">Add Problem</Link>
        <button className="logout-btn" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;