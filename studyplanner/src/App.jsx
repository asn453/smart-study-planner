import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar"; // Make sure the path to your Navbar matches
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import Quiz from "./pages/Quiz";
import PdfManager from "./pages/PdfManager";
import Homepage from "./pages/Homepage";

function App() {
  // Initialize state directly from localStorage so it keeps the login session on page refresh
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      {/* 1. Navbar is placed here so it shows on all screens. We pass state as props */}
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />

        {/* 2. Pass setToken down so the Login page can notify App.js when authorization succeeds */}
        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/planner"
          element={
            <PrivateRoute>
              <StudyPlanner />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />

        <Route
          path="/pdf"
          element={
            <PrivateRoute>
              <PdfManager />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;