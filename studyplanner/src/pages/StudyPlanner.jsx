import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function StudyPlanner() {
  const [plans, setPlans] = useState([]);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get("planner/");
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
      await api.post("planner/", {
        subject,
        topic,
      });

      setSubject("");
      setTopic("");

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (item) => {
    const confirmDelete = window.confirm(
      `Did you complete "${item.subject}"?\nDo you want to remove it?`,
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`planner/${item.id}/`);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

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
                  className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      onChange={() => toggleComplete(item)}
                      className="mt-1 h-5 w-5 cursor-pointer"
                    />

                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        📚 {item.subject}
                      </h3>

                      <p className="text-gray-500 mt-1">{item.topic}</p>
                    </div>
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
