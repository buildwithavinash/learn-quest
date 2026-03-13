import { Brain, Gamepad2, TrendingUp } from "lucide-react"

const Features = () => {
  return (
    
    <section className="bg-slate-900 text-white py-20 px-6">

        <div className="max-w-6xl mx-auto">

            {/* section title */}
        <div className="text-center mb-16">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features
            </h2>

            <p className="text-gray-400 max-w-xl mx-auto">
                LearnQuest helps you discover the best path to master any skill with AI powered roadmaps and gamified learning.
            </p>
        </div>

        {/* feature cards */}

        <div className="grid gap-8 md:grid-cols-3">
            {/* feature 1 */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-indigo-500 transition">

                <Brain className="text-indigo-500 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">AI Learning Paths</h3>
                <p className="text-gray-400">Generate personalized learning roadmaps powered by AI based on your goals and skill level.</p>
            </div>

            {/* feature 2 */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-indigo-500 transition">
                <Gamepad2 className="text-indigo-500 mb-4" size={32} />

                <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
                <p className="text-gray-400">Earn XP, level up, and stay motivated as you complete learning tasks and milestones.</p>
            </div>

            {/* feature 3 */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-indigo-500 transition">
                <TrendingUp className="text-indigo-500 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-400">Track your progress visually and stay on track with your learning journey.</p>
            </div>
        </div>


        </div>

    </section>
  )
}

export default Features