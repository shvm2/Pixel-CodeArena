// import React, { useState } from "react";
// import axios from "axios";
// import { DiCodeBadge } from "react-icons/di";
// import "./login.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:6001/auth/login",
//         data
//       );

//       localStorage.setItem("token", response.data.data);
//       window.location = "/home";
//     } catch (error) {
//       notify();
//       console.log(error);
//     }
//   };

//   const notify = () => {
//     toast.error("Invalid Email or Password!");
//   };

//   return (
//     <div className="login-container">
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
//       <div className="login-box">
//         <div className="logo-title">
//           <DiCodeBadge size="50px" />
//           <span>PixelLab</span>
//         </div>
//         <form className="form-container" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             value={data.email}
//             placeholder="Email"
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             value={data.password}
//             placeholder="Password"
//             onChange={handleChange}
//           />
//           <button className="submit-btn" type="submit">
//             Log In
//           </button>
//         </form>
//         <div className="forgot-container">
//           <a href="/">Forgot Password?</a>
//           <a href="/signup">Sign Up</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { DiCodeBadge } from "react-icons/di";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:6001/auth/login",
        data
      );

      localStorage.setItem("token", response.data.data);
      window.location = "/home";
    } catch (error) {
      notify();
      console.log(error);
    }
  };

  const notify = () => {
    toast.error("Invalid Email or Password!");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="login-container">
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
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div className="login-box">
        <div className="logo-title">
          <DiCodeBadge size="50px" />
          <span>PixelLab</span>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">
            Log In
          </button>
        </form>
        <div className="forgot-container">
          <a href="/">Forgot Password?</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;