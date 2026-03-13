
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950 text-white ">
        
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

            {/* logo */}
            <h1 className="text-xl font-bold tracking-wide">
                LearnQuest
            </h1>

            {/* mobile menu icon */}
            <button className="md:hidden">
                <Menu size={26}/>
            </button>

            {/* desktop navigation */}
            <div className="hidden md:flex gap-6 text-sm text-gray-300 items-center">

                <a href="#" className="hover:text-white transition">
                    Features
                </a>

                <a href="#" className="hover:text-white transition">
                    Dashboard
                </a>

                <button className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Get Started
                </button>


            </div>
        </div>
    </nav>
  )
}

export default Navbar