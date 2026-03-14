import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar";
import GoalPage from "./pages/GoalPage";
import RoadMapsPage from "./pages/RoadMapsPage";
import RoadMapPage from "./pages/RoadMapPage";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/generate" element={<GoalPage />} />
      <Route path="/roadmaps" element={<RoadMapsPage />} />
      <Route path="/roadmap/:id" element={<RoadMapPage />} />
      
    </Routes>

    </BrowserRouter>
  )
}

export default App;