import { useNavigate } from "react-router-dom";
import Features from "../components/Features";
import { useState } from "react";

const LandingPage = () => {

  const navigate = useNavigate();

  const [hasRoadmap] = useState(() => {
    const saved = localStorage.getItem("learnquest-roadmaps");
    return !!saved;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          LearnQuest
        </h1>

        <p className="text-indigo-400 font-medium mb-3">
          AI Powered Learning Planner
        </p>

        <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8">
          Generate your personalized learning roadmap with AI and turn your
          goals into achievements.
        </p>

        {/* Generate Button */}
        <button
          onClick={() => navigate("/generate")}
          className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold transition cursor-pointer"
        >
          Generate Your Learning Path
        </button>

        {/* Continue Button */}
        {hasRoadmap && (
          <button
            onClick={() => navigate("/roadmaps")}
            className="mt-4 border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition cursor-pointer"
          >
            Continue Learning
          </button>
        )}

      </section>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

    </div>
  );
};

export default LandingPage;