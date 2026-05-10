import { useState } from "react";
import { useParams } from "react-router-dom";
import TopicItem from "../components/TopicItem";
import { getProgress, getRoadmaps, saveProgress } from "../services/storageService";

function getLevel(xp) {
  if (xp >= 600) return { level: 4, title: "Master Learner" };
  if (xp >= 300) return { level: 3, title: "Knowledge Seeker" };
  if (xp >= 100) return { level: 2, title: "Skill Builder" };

  return { level: 1, title: "Beginner Explorer" };
}

const RoadMapPage = () => {
  const { id } = useParams();
  const roadmap = getRoadmaps().find((roadmap) => roadmap.id.toString() === id);

  const [completedTopics, setCompletedTopics] = useState(() => {
    const progress = getProgress();
    return progress[id] || {};
  });

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        Roadmap not found
      </div>
    );
  }

  const toggleTopic = (key) => {
    const updated = {
      ...completedTopics,
      [key]: !completedTopics[key],
    };

    setCompletedTopics(updated);

    const progress = getProgress();
    progress[id] = updated;
    saveProgress(progress);
  };

  const totalTopics = roadmap.weeks.reduce(
    (acc, week) => acc + week.topics.length,
    0
  );

  const completedCount = Object.values(completedTopics).filter(Boolean).length;
  const progressPercent = totalTopics
    ? Math.round((completedCount / totalTopics) * 100)
    : 0;
  const xp = completedCount * 10;
  const levelData = getLevel(xp);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-10">
        Your Learning Roadmap
      </h1>

      <div className="mb-8 bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-gray-400">Level</p>
            <h2 className="text-lg font-semibold">
              {levelData.level} - {levelData.title}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">XP</p>
            <h2 className="text-lg font-semibold">{xp}</h2>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Progress: {progressPercent}%</p>
        <div className="w-full bg-slate-800 h-3 rounded">
          <div style={{ width: `${progressPercent}%` }} className="bg-indigo-500 h-3 rounded transition-all" />
        </div>
      </div>

      <div className="space-y-8">
        {roadmap.weeks.map((week) => (
          <div key={week.week} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Week {week.week}</h2>

            <ul className="space-y-2">
              {week.topics.map((topic, index) => {
                const key = `week${week.week}topic${index}`;

                return (
                  <li key={key}>
                    <TopicItem topic={topic} completed={completedTopics[key]} onToggle={() => toggleTopic(key)} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadMapPage;
