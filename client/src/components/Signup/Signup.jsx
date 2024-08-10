// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./signup.css";
// import { DiCodeBadge } from "react-icons/di";

// const Signup = () => {
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

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
//         "http://localhost:6001/auth/signup",
//         data
//       );
//       console.log(response);
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <div className="logo-title">
//           <DiCodeBadge size="50px" />
//           <span>SheetCoder</span>
//         </div>
//         <form className="form-container" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={data.username}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={data.email}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={data.password}
//             onChange={handleChange}
//           />
//           <button className="submit-btn" type="submit">
//             Sign Up
//           </button>
//         </form>
//         <div className="have-account-container">
//           <p>Have an account? </p>
//           <a href="/login">Sign In</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { DiCodeBadge } from "react-icons/di";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();

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
        "http://localhost:6001/auth/signup",
        data
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="signup-container">
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div className="signup-box">
        <div className="logo-title">
          <DiCodeBadge size="50px" />
          <span>PixelLab</span>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">
            Sign Up
          </button>
        </form>
        <div className="have-account-container">
          <p>Have an account? </p>
          <a href="/login"> Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;