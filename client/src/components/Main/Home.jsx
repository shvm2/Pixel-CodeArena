// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../Topbar/Navbar";
// import "./Home.css";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import TableData from "./TableData";

// function Home() {
//   const [problems, setProblems] = useState([]);

//   useEffect(() => {
//     async function fetchProbelems() {
//       try {
//         const response = await axios.get(
//           "http://localhost:6001/problemsTable"
//         );
//         setProblems(response.data.data);
//         toast.success("Logged in successfully");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchProbelems();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <TableData problems={problems} />
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Topbar/Navbar";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableData from "./TableData";

function Home() {
  const [problems, setProblems] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get(
          "http://localhost:6001/problemsTable"
        );
        setProblems(response.data.data);
        if (!notificationShown) {
          toast.success("Problems data loaded successfully");
          setNotificationShown(true); // Ensure notification only shows once
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load problems data");
      }
    }
    fetchProblems();
    
    // Apply dark mode class initially
    document.body.classList.toggle("dark-mode", darkMode);

    return () => {
      // Clean up dark mode class on unmount
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode, notificationShown]);

  const handleToggle = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <>
      <Navbar />
      <button className={`toggle-btn ${darkMode ? 'dark-mode' : 'light-mode'}`} onClick={handleToggle}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className={`main-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <TableData problems={problems} />
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

export default Home;