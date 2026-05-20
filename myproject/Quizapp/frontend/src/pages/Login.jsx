import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("login/", form);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("/dashboard");
    } catch {
      setError("Username or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="flex items-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          <p className="text-sm font-semibold text-emerald-600">Smart Study Planner</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Welcome back</h1>
          <p className="mt-3 text-slate-600">Sign in to manage your study plan, quizzes, and PDFs.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Username</span>
              <input
                className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                name="username"
                value={form.username}
                onChange={updateField}
                autoComplete="username"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                name="password"
                type="password"
                value={form.password}
                onChange={updateField}
                autoComplete="current-password"
                required
              />
            </label>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            New here?{" "}
            <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </section>

      <section className="hidden bg-emerald-700 px-12 py-16 text-white lg:flex lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">Study system</p>
          <h2 className="mt-4 max-w-xl text-5xl font-bold leading-tight">
            Plan lessons, generate quizzes, and keep study files in one place.
          </h2>
        </div>
      </section>
    </main>
  );
}

export default Login;
