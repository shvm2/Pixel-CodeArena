// src/ParentComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AvailableContests from "./components/Contest/AvailableContests";

const ParentComponent = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:6001/contests');
        setContests(response.data);
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };
    fetchContests();
  }, []);

  return <AvailableContests contests={contests} />;
};

export default ParentComponent;
