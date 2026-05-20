import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
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
      await api.post("register/", form);
      navigate("/login");
    } catch {
      setError("Registration failed. Check the details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-emerald-600">Create account</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Start planning smarter</h1>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              name="username"
              value={form.username}
              onChange={updateField}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              required
            />
          </label>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
