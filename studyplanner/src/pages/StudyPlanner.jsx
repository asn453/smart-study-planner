import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function StudyPlanner() {
  const [plans, setPlans] = useState([]);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get("/api/planner/");
      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = async () => {
    if (!subject || !topic) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/api/planner/", {
        subject,
        topic,
        completed: false, // Default to incomplete
      });

      setSubject("");
      setTopic("");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // 1. Handle toggling the completed status (PATCH/PUT)
  const toggleComplete = async (item) => {
    try {
      await api.patch(`/api/planner/${item.id}/`, {
        completed: !item.completed,
      });
      fetchData(); // Refresh list to get updated statuses
    } catch (error) {
      console.log("Error updating task status:", error);
    }
  };

  // 2. Handle explicit task deletion
  const deleteTask = async (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.subject}"?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/planner/${item.id}/`);
      fetchData();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // 3. Dynamic Progress Calculation
  const totalTasks = plans.length;
  const completedTasks = plans.filter((plan) => plan.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mb-6 bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-slate-50 transition duration-300"
        >
          ← Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Study Planner</h1>
          <p className="text-gray-500 mt-2">
            Plan your study schedule and stay productive
          </p>
        </div>

        {/* Progress Bar Section */}
        <div className="bg-white p-6 rounded-3xl shadow-md mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-slate-900">{progressPercentage}% ({completedTasks}/{totalTasks})</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Add Task */}
        <div className="bg-white p-8 rounded-3xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6">Add Study Task</h2>
          <div className="space-y-4">
            <input
              value={subject}
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
            <input
              value={topic}
              placeholder="Topic"
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
            <button
              onClick={addTask}
              className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition duration-300"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Study Tasks</h2>

          {plans.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-md">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-gray-500 text-lg">No study tasks available</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {plans.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl shadow-md border transition duration-300 ${
                    item.completed 
                      ? "bg-emerald-50/60 border-emerald-200" 
                      : "bg-white border-transparent hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleComplete(item)}
                        className="mt-1.5 h-5 w-5 cursor-pointer accent-emerald-600"
                      />
                      <div>
                        <h3 className={`font-bold text-lg transition duration-200 ${
                          item.completed ? "line-through text-gray-400" : "text-gray-800"
                        }`}>
                          📚 {item.subject}
                        </h3>
                        <p className={`mt-1 transition duration-200 ${
                          item.completed ? "line-through text-gray-400" : "text-gray-500"
                        }`}>
                          {item.topic}
                        </p>
                        {item.completed && (
                          <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                            Completed ✓
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Separate Delete Button */}
                    <button
                      onClick={() => deleteTask(item)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-gray-100 transition duration-200"
                      title="Delete Task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyPlanner;