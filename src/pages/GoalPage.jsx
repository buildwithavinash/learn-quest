import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../services/geminiService";
import { getRoadmaps, saveRoadmaps } from "../services/storageService";

const GoalPage = () => {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("beginner");
  const [hours, setHours] = useState(1);
  const [style, setStyle] = useState("projects");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!goal.trim()) {
      setError("Please enter a learning goal.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const roadmap = await generateRoadmap(goal.trim(), level, Number(hours), style);
      const roadmaps = getRoadmaps();

      const newRoadmap = {
        id: Date.now(),
        goal: goal.trim(),
        weeks: roadmap.weeks,
        createdAt: new Date().toISOString(),
      };

      saveRoadmaps([...roadmaps, newRoadmap]);
      navigate("/roadmaps");
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong while generating the roadmap.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-xl w-full max-w-md border border-slate-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Generate Your Learning Path</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-400">What do you want to learn?</label>
          <input
            type="text"
            placeholder="Example: React Developer"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-400">Current skill level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-400">Hours per day</label>
          <input
            type="number"
            placeholder="1-10"
            min={1}
            max={10}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-400">Learning style</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700">
            <option value="projects">Project based</option>
            <option value="theory">Theory based</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 py-3 rounded-lg font-semibold transition cursor-pointer">
          {loading ? "Generating Roadmap..." : "Generate Roadmap"}
        </button>
      </form>
    </div>
  );
};

export default GoalPage;
