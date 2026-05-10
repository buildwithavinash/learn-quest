import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // prevent background scrolling when mobile menu is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleFeaturesClick = () => {
    setMenuOpen(false);
    navigate("/");
    setTimeout(() => {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950 text-white">

      {/* NAV CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer hover:text-indigo-400 transition"
        >
          LearnQuest
        </h1>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-6">

          <button
            onClick={() => navigate("/")}
            className="hover:text-indigo-400 transition"
          >
            Home
          </button>

          <button
            onClick={handleFeaturesClick}
            className="hover:text-indigo-400 transition"
          >
            Features
          </button>

          <button
            onClick={() => navigate("/roadmaps")}
            className="hover:text-indigo-400 transition"
          >
            Roadmaps
          </button>

          <button
            onClick={() => navigate("/generate")}
            className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Generate
          </button>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden">

          {/* MENU PANEL */}
          <div className="bg-slate-950 w-full h-full px-8 py-8 flex flex-col gap-6">

            {/* CLOSE BUTTON */}
            <div className="flex justify-between items-center">

              <h2
                onClick={() => handleNavigate("/")}
                className="text-lg font-semibold cursor-pointer"
              >
                LearnQuest
              </h2>

              <button onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>

            </div>

            {/* MENU LINKS */}

<div className="flex flex-col gap-8 items-center justify-center mt-4">
        <button
              onClick={() => handleNavigate("/")}
              className="text-left text-lg hover:text-indigo-400 cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={handleFeaturesClick}
              className="text-lg hover:text-indigo-400 cursor-pointer"
            >
              Features
            </button>

            <button
              onClick={() => handleNavigate("/roadmaps")}
              className="text-left text-lg hover:text-indigo-400 cursor-pointer"
            >
              Roadmaps
            </button>

            <button
              onClick={() => handleNavigate("/generate")}
              className="bg-indigo-600 px-5 py-3 rounded-md w-fit hover:bg-indigo-700 cursor-pointer"
            >
              Generate
            </button>

</div>
            
          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;
