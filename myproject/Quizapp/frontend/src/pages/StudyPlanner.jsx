import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import api from "../services/api.js";

function StudyPlanner() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ subject: "", topic: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const completedCount = useMemo(() => plans.filter((plan) => plan.completed).length, [plans]);

  const fetchPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("planner/");
      setPlans(response.data);
    } catch {
      setError("Could not load your study plan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const addPlan = async (event) => {
    event.preventDefault();
    if (!form.subject.trim() || !form.topic.trim()) return;

    setSaving(true);
    setError("");
    try {
      await api.post("planner/", form);
      setForm({ subject: "", topic: "" });
      await fetchPlans();
    } catch {
      setError("Could not add this plan.");
    } finally {
      setSaving(false);
    }
  };

  const togglePlan = async (plan) => {
    const nextValue = !plan.completed;
    setPlans((items) => items.map((item) => (item.id === plan.id ? { ...item, completed: nextValue } : item)));

    try {
      await api.patch(`planner/${plan.id}/`, { completed: nextValue });
    } catch {
      setPlans((items) => items.map((item) => (item.id === plan.id ? plan : item)));
      setError("Could not update the task.");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Planner"
        title="Study plan"
        description="Break subjects into focused topics and mark them complete as you go."
      />

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <form onSubmit={addPlan} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-950">Add a task</h3>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Subject</span>
              <input
                className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                placeholder="Mathematics"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Topic</span>
              <input
                className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                value={form.topic}
                onChange={(event) => setForm({ ...form, topic: event.target.value })}
                placeholder="Quadratic equations"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:bg-emerald-300"
            >
              {saving ? "Adding..." : "Add task"}
            </button>
          </div>
        </form>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-950">Tasks</h3>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
              {completedCount}/{plans.length} complete
            </span>
          </div>

          {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-5 space-y-3">
            {loading && <p className="text-sm text-slate-500">Loading plan...</p>}
            {!loading && plans.length === 0 && <p className="text-sm text-slate-500">No study tasks yet.</p>}
            {plans.map((plan) => (
              <label
                key={plan.id}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <input
                  type="checkbox"
                  checked={plan.completed}
                  onChange={() => togglePlan(plan)}
                  className="mt-1 h-4 w-4 accent-emerald-600"
                />
                <span>
                  <span className="block font-semibold text-slate-950">{plan.subject}</span>
                  <span className="text-sm text-slate-600">{plan.topic}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default StudyPlanner;
