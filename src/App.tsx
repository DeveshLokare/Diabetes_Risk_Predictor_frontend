import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Results from "./pages/Results";
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/home" />} />

        
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/results" element={<Results />} />

        
        <Route path="*" element={<h1 className="text-center mt-20 text-red-500">404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
