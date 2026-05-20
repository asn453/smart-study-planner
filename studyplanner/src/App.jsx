import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import StudyPlanner from "./pages/StudyPlanner"
import Quiz from "./pages/Quiz"
import PdfManager from "./pages/PdfManager"
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/planner" element={<StudyPlanner/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/pdf" element={<PdfManager/>}/>

      </Routes>

    </BrowserRouter>
  )
}

export default App
