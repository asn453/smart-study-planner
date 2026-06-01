import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


function Homepage() {
  return (
     <>

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 font-semibold mb-4">
                SMART STUDY PLATFORM
              </p>

              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Learn Smarter.
                <br />
                Study Better.
                <br />
                Achieve More.
              </h1>

              <p className="mt-8 text-gray-600 text-lg leading-8">
                Smart Study Planner is an all-in-one learning platform that
                helps students organize study plans, generate quizzes, manage
                PDFs, and improve productivity through AI-powered tools.
              </p>

              <div className="mt-10 flex gap-5">
                <Link
                  to="/login"
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
                <div className="space-y-5">
                  <div className="bg-blue-50 p-5 rounded-xl">
                    📚 Study Planning & Scheduling
                  </div>

                  <div className="bg-green-50 p-5 rounded-xl">
                    🧠 AI Quiz Generator
                  </div>

                  <div className="bg-purple-50 p-5 rounded-xl">
                    📄 PDF Upload & Management
                  </div>

                  <div className="bg-orange-50 p-5 rounded-xl">
                    🚀 Productivity & Learning Tools
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">
                Everything For You To Learn
              </h2>

              <p className="text-gray-500 mt-4">
                Powerful tools designed for students
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/login">
                <div className="bg-slate-50 p-8 rounded-3xl shadow hover:shadow-2xl transition">
                  <div className="text-5xl mb-5">📚</div>

                  <h3 className="text-2xl font-bold">Study Planner</h3>

                  <p className="mt-4 text-gray-600">
                    Create and organize your study schedule with ease.
                  </p>
                </div>
              </Link>

              <Link to="/login">
                <div className="bg-slate-50 p-8 rounded-3xl shadow hover:shadow-2xl transition">
                  <div className="text-5xl mb-5">🧠</div>

                  <h3 className="text-2xl font-bold">Quiz Generator</h3>

                  <p className="mt-4 text-gray-600">
                    Generate quizzes instantly and improve learning.
                  </p>
                </div>
              </Link>

              <Link to="/login">
                <div className="bg-slate-50 p-8 rounded-3xl shadow hover:shadow-2xl transition">
                  <div className="text-5xl mb-5">📄</div>

                  <h3 className="text-2xl font-bold">PDF Manager</h3>

                  <p className="mt-4 text-gray-600">
                    Upload and organize notes and study materials.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Homepage