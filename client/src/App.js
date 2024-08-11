import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Main/Home";
import Problem from "./components/Problem/Problem";
import CreateContest from "./components/Contest/CreateContest";
import AvailableContests from "./components/Contest/AvailableContests";
import ContestDetails from "./components/Contest/ContestDetails"; // Import the new component for instructions
import ContestInstructions from "./components/Contest/ContestInstructions"; // Import the component for instructions
import ContestTimer from "./components/Contest/ContestTimer"; // Import the component for timer
import ContestPage from "./components/Contest/ContestPage"; // Import the new component
import ParentComponent from "./ParentComponent"; // Import the new component
import CodingPage from "./components/CodingPage/CodingPage";
import SubmitPage from './components/SubmitPage/SubmitPage';
import AddProblemPage from './components/AddProblemPage/AddProblemPage'

function App() {
  const user = localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        {user && <Route exact path="/home" element={<Home />} />}
        {user && <Route exact path="/problem/:id" element={<Problem />} />}
        {user && <Route exact path="/contest/create" element={<CreateContest />} />}
        <Route path="/contest/available" element={<AvailableContests />} />
        <Route path="/contest/:id/instructions" element={<ContestInstructions />} />
        <Route path="/contest/:id/coding" element={<CodingPage />} />
        <Route path="/contest/:id/start" element={<Problem />} /> {/* Coding page route */}
        {user && <Route exact path="/contest/:id" element={<ContestPage />} />} {/* Route for contest */}
        {user && <Route exact path="/contest/:id/timer" element={<ContestTimer />} />} {/* New route for contest timer */}
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/contest/:id/submit" element={<SubmitPage />} />
        <Route path="/problems/add-problem" element={<AddProblemPage />} />
        <Route exact path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
