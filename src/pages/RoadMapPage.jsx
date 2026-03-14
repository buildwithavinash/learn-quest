import { useState } from "react";
import { useParams } from "react-router-dom"
import TopicItem from "../components/TopicItem";


const RoadMapPage = () => {

    const { id } = useParams(); 
    const [completedTopics, setCompletedTopics] = useState(() => {

  const saved = localStorage.getItem("learnquest-progress")

  if (!saved) return {}

  const progress = JSON.parse(saved)

  return progress[id] || {}

});

  
   
    const saved = localStorage.getItem("learnquest-roadmaps");
    let roadmap = null;

    if(saved){
        const roadmaps = JSON.parse(saved);

        roadmap= roadmaps.find((r)=> r.id.toString() === id)
    }

    if(!roadmap){
        return (
            <div className="text-white p-10">
                Roadmap not found
            </div>
        )
    }

    const toggleTopic = (key) => {
        const updated = {
    ...completedTopics,
    [key]: !completedTopics[key]
  }

  setCompletedTopics(updated)

  const saved = localStorage.getItem("learnquest-progress")
  const progress = saved ? JSON.parse(saved) : {}

  progress[id] = updated

  localStorage.setItem(
    "learnquest-progress",
    JSON.stringify(progress)
  )

    } 
    
    const totalTopics = roadmap.weeks.reduce(
  (acc, week) => acc + week.topics.length,
  0
)

const completedCount = Object.values(completedTopics)
  .filter(Boolean)
  .length

const progressPercent = Math.round(
  (completedCount / totalTopics) * 100
)


const xpPerTopic = 10;
const xp = completedCount * xpPerTopic;

// calculate level

function getLevel(xp){

        if (xp >= 600) return { level: 4, title: "Master Learner" }
  if (xp >= 300) return { level: 3, title: "Knowledge Seeker" }
  if (xp >= 100) return { level: 2, title: "Skill Builder" }

  return { level: 1, title: "Beginner Explorer" }
}

const levelData = getLevel(xp);

// main return
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

        <h1 className="text-3xl font-bold mb-10">
            Your Learning Roadmap
        </h1>

{/* level xp */}

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
      <h2 className="text-lg font-semibold">
        {xp}
      </h2>
    </div>

  </div>

</div>

{/* progress bar */}
        <div className="mb-8">
            <p className="text-sm text-gray-400 mb-2">Progress: {progressPercent}%</p>
            <div className="w-full bg-slate-800 h-3 rounded">
                <div style={{width: `${progressPercent}%`}} className="bg-indigo-500 h-3 rounded transition-all"/>
            </div>

        </div>

        <div className="space-y-8">

            {roadmap.weeks.map((week)=>(
                <div key={week.week} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Week {week.week}</h2>

                    <ul className="space-y-2">
                        {week.topics.map((topic, index)=>{

                            const key = `week${week.week}topic${index}`

                            return (
                                <TopicItem key={key} topic={topic} completed={completedTopics[key]} onToggle={() => toggleTopic(key)} />
                            )
                        }
                        )}
                    </ul>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RoadMapPage