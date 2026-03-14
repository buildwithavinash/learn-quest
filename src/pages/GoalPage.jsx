import { useState } from "react";

const GoalPage = () => {

  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("beginner");
  const [hours, setHours] = useState(1);
  const [style, setStyle] = useState("projects");


  function handleSubmit(e){
    e.preventDefault();

    const userInput = {
        goal,
        level,
        hours,
        style
    }

    console.log(userInput);
  };




  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-xl w-full max-w-md border border-slate-800">

        <h2 className="text-2xl font-bold mb-6 text-center">Generate Your Learning Path</h2>

        {/* goal */}
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-400">What do you want to learn?</label>

          <input
            type="text"
            placeholder="Example: React Developer"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* skill level */}
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-400">Current Skill level</label>

          <select value={level} onChange={(e)=>setLevel(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700">
            <option value="begineer">Begineer</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* hours */}
        <div className="mb-4">
          <label htmlFor="" className="block mb-2 text-sm text-gray-400 focus:outline-none focus:border-indigo-500">Hours per day</label>

          <input
            type="number"
            placeholder="1-10"
            min={1}
            max={10}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        {/* learning style */}
        <div className="mb-4">
          <label htmlFor="" className="block mb-2 text-sm text-gray-400">Learning Style</label>

          <select value={style} onChange={(e)=>setStyle(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700">
            <option value="projects">Project Based</option>
            <option value="theory">Theory Based</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        {/* submit */}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition cursor-pointer">Generate Roadmap</button>
      </form>
    </div>
  );
};

export default GoalPage;
