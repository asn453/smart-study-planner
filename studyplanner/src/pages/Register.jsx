import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({username: "",email: "",password: "",});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("register/", data);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-950 p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Smart Study Planner
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account to begin learning
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Username
            </label>

            <input
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?
          <Link
            to="/"
            className="text-slate-800 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
