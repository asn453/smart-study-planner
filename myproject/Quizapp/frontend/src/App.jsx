import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import PdfManager from "./pages/PdfManager.jsx";
import Quiz from "./pages/Quiz.jsx";
import Register from "./pages/Register.jsx";
import StudyPlanner from "./pages/StudyPlanner.jsx";

function ProtectedRoute({ children }) {
  return localStorage.getItem("accessToken") ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/pdf" element={<PdfManager />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
