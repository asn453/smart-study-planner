import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic) {
      alert("Enter a topic");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("quiz/generate/", {
        topic,
      });

      console.log(response.data);

      const data = response.data.quiz;

      if (Array.isArray(data)) {
        setQuiz(data);
      } else {
        const questions = data
          .split(/---|Question:/g)
          .filter((item) => item.trim() !== "")
          .map((item) => item.trim());

        setQuiz(questions);
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
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

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Quiz Generator</h1>

          <p className="text-gray-500 mt-2">
            Generate AI-powered quizzes instantly
          </p>
        </div>

        {/* Generator Card */}

        <div className="bg-white rounded-3xl shadow-md p-8 mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">🧠</div>

            <h2 className="text-2xl font-semibold">Create a Quiz</h2>
          </div>

          <input
            value={topic}
            placeholder="Enter topic (Ex: Python, React, Django)"
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
          />

          <button
            onClick={generateQuiz}
            disabled={loading}
            className="w-full mt-5 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition duration-300 shadow-md disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>

        {/* Quiz Questions */}

        {quiz.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Generated Questions
            </h2>

            <div className="space-y-6">
              {quiz.map((q, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="flex gap-4">
                    <div className="bg-slate-900 text-white h-10 w-10 min-w-10 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-4">
                        Question {index + 1}
                      </h3>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <pre className="whitespace-pre-wrap break-words text-gray-700 font-sans">
                          {q}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
