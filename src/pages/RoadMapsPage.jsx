import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoadMapsPage = () => {
  const navigate = useNavigate();
  const [roadmaps] = useState(() => {
    const saved = localStorage.getItem("learnquest-roadmaps");
    return saved ? JSON.parse(saved) : [];
  });

  const savedProgress = localStorage.getItem("learnquest-progress");

  const progress = savedProgress ? JSON.parse(savedProgress) : {};
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Your learning Paths</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {roadmaps.map((roadmap) => {
          const roadmapProgress = progress[roadmap.id] || {};

          const completedCount =
            Object.values(roadmapProgress).filter(Boolean).length;

          const totalTopics = roadmap.weeks.reduce(
            (acc, week) => acc + week.topics.length,
            0,
          );

          const percent = totalTopics
            ? Math.round((completedCount / totalTopics) * 100)
            : 0;

          return (
            <div
              key={roadmap.id}
              onClick={() => navigate(`/roadmap/${roadmap.id}`)}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl cursor-pointer hover:border-indigo-500"
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadMapsPage;
