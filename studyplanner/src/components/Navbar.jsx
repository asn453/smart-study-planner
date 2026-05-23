import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-gray-800 shadow-lg px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Smart Study Planner
          </h1>

          <p className="text-gray-400 text-sm">Organize • Learn • Achieve</p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/planner"
            className="text-gray-300 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition duration-300">
            Planner
          </Link>

          <Link
            to="/quiz"
            className="text-gray-300 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition duration-300">
            Quiz
          </Link>

          <Link
            to="/pdf"
            className="text-gray-300 hover:text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition duration-300">
            PDF
          </Link>

          {token ? (<button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-medium text-white shadow-md hover:shadow-red-500/40 transition-all duration-300">
              Logout
            </button>) 
            : (<Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl text-white">Login</Link>)}
        </div>
      </div>
    </nav>
  );
}



export default Navbar;