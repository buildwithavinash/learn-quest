import { useLocation } from "react-router-dom"


const RoadMapPage = () => {

    const location = useLocation();
    const roadmap = location.state?.roadmap;

    if(!roadmap){
        return (
            <div className="text-white p-10">
                No Roadmap found.
            </div>
        )
    }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

        <h1 className="text-3xl font-bold mb-10">
            Your Learning Roadmap
        </h1>

        <div className="space-y-8">

            {roadmap.weeks.map((week)=>(
                <div key={week.week} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Week {week.week}</h2>

                    <ul className="space-y-2">
                        {week.topics.map((topic, index)=>(
                            
                            <li key={index} className="bg-slate-800 p-3 rounded-md">{topic}</li>

                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RoadMapPage