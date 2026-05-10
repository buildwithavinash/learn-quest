import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProgress, getRoadmaps } from "../services/storageService";

const RoadMapsPage = () => {
  const navigate = useNavigate();
  const [roadmaps] = useState(getRoadmaps);
  const progress = getProgress();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Your Learning Paths</h1>

      {roadmaps.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-gray-300">No roadmaps yet.</p>
          <button
            onClick={() => navigate("/generate")}
            className="mt-4 rounded-lg bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
          >
            Generate a Roadmap
          </button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {roadmaps.map((roadmap) => {
          const roadmapProgress = progress[roadmap.id] || {};

          const completedCount =
            Object.values(roadmapProgress).filter(Boolean).length;

          const totalTopics = roadmap.weeks.reduce(
            (acc, week) => acc + week.topics.length,
            0
          );

          const percent = totalTopics
            ? Math.round((completedCount / totalTopics) * 100)
            : 0;

          return (
            <button
              type="button"
              key={roadmap.id}
              onClick={() => navigate(`/roadmap/${roadmap.id}`)}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl cursor-pointer text-left hover:border-indigo-500"
            >
              <h2 className="text-xl font-semibold mb-2">{roadmap.goal}</h2>
              <p className="text-gray-400 text-sm mb-3">Progress: {percent}%</p>

              <div className="w-full bg-slate-800 h-2 rounded">
                <div
                  style={{ width: `${percent}%` }}
                  className="bg-indigo-500 h-2 rounded"
                />
              </div>
              <p className="mt-4">Click to continue learning</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoadMapsPage;
