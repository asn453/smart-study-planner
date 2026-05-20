import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import api from "../services/api.js";

function normalizeQuiz(payload) {
  if (Array.isArray(payload)) return payload;
  if (typeof payload === "string") return payload.split("\n").filter(Boolean);
  return [];
}

function Quiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const response = await api.get("quiz/");
      setHistory(response.data);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const generateQuiz = async (event) => {
    event.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setQuiz([]);

    try {
      const response = await api.post("quiz/Quiz_generation/", { quiz_topic: topic });
      setQuiz(normalizeQuiz(response.data.quiz));
      await fetchHistory();
    } catch {
      setError("Could not generate a quiz. Check the backend quiz endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Quiz"
        title="Generate practice questions"
        description="Enter a topic and turn it into quick revision prompts."
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <form onSubmit={generateQuiz} className="flex flex-col gap-3 sm:flex-row">
            <input
              className="h-11 flex-1 rounded-lg border border-slate-300 px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Photosynthesis, Django REST, World War II..."
            />
            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-lg bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:bg-emerald-300"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </form>

          {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-6 space-y-3">
            {quiz.length === 0 && !loading && (
              <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                Generated questions will appear here.
              </p>
            )}
            {quiz.map((question, index) => (
              <div key={`${question}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold text-emerald-700">Question {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-slate-800">{question}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-950">Recent topics</h3>
          <div className="mt-4 space-y-3">
            {history.length === 0 && <p className="text-sm text-slate-500">No quiz history yet.</p>}
            {history.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold text-slate-950">{item.topic}</p>
                <p className="text-sm text-slate-500">Score: {item.score}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}

export default Quiz;
