import { useNavigate } from "react-router-dom";
import Features from "../components/Features";
import { useState } from "react";

const LandingPage = () => {

 const [hasRoadmap] = useState(() => {
  const saved = localStorage.getItem("learnquest-roadmaps")
  return !!saved
})


  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* hero section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">LearnQuest</h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8">
          Generate your personalized learning roadmap with AI and turn your
          goals into achievements.
        </p>

        <button onClick={()=> navigate("/generate")} className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold transition cursor-pointer">
         Generate Your Learning Path
        </button>

        {hasRoadmap && <button onClick={()=> navigate("/roadmaps")} className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold transition cursor-pointer">Continue Learing</button>}
      </section>

      {/* features */}

      <Features />

    </div>
  );
};

export default LandingPage;
