import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

const modules = [
  {
    title: "Study Planner",
    description: "Create subject and topic tasks, then track what is already done.",
    to: "/planner",
    accent: "bg-emerald-100 text-emerald-800",
    stat: "Plans",
  },
  {
    title: "Quiz Generator",
    description: "Generate quiz prompts from a topic and keep your recent quiz records.",
    to: "/quiz",
    accent: "bg-cyan-100 text-cyan-800",
    stat: "Practice",
  },
  {
    title: "PDF Manager",
    description: "Upload study PDFs with titles and open them whenever you need them.",
    to: "/pdf",
    accent: "bg-amber-100 text-amber-800",
    stat: "Files",
  },
];

function Dashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Your study command center"
        description="Move between planning, practice, and resources without losing the thread."
      />

      <section className="grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <Link
            key={module.title}
            to={module.to}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${module.accent}`}>
              {module.stat}
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-950">{module.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
          </Link>
        ))}
      </section>
    </>
  );
}

export default Dashboard;
