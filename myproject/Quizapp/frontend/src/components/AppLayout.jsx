import { NavLink, Outlet, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "D" },
  { to: "/planner", label: "Planner", icon: "P" },
  { to: "/quiz", label: "Quiz", icon: "Q" },
  { to: "/pdf", label: "PDFs", icon: "F" },
];

function AppLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-4 py-5 lg:block">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">Smart Study</p>
          <h1 className="mt-2 text-2xl font-bold">Planner</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-xs font-bold">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold text-slate-500">Workspace</p>
              <p className="text-lg font-bold">Smart Study Planner</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
