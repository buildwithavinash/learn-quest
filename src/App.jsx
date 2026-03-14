import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar";
import GoalPage from "./pages/GoalPage";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/generate" element={<GoalPage />} />
    </Routes>
    
    </BrowserRouter>
  )
}

export default App;