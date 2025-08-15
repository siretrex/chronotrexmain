import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HeroPage from "../../../../chronotrex/client/src/component/HeroPage";

const LandingPage = () => {
  const userId = useSelector((state) => state.user?.user?._id)
  return (
    <>
    {
      !userId ? <div className="w-full min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#1a1a1a] text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Own Your Time with <span className="text-violet-500">Chronotrex</span>
          </h1>
          <p className="text-lg text-gray-300">
            You can’t improve what you don’t measure. Chronotrex helps you track your
            study & work hours so you can focus, build habits, and see where your time actually goes.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/register"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg shadow-md transition duration-200 text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-violet-500 hover:bg-violet-500/20 rounded-lg transition duration-200 text-lg disabled:"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Content - Card */}
        <div className="bg-gray-800/50 rounded-xl shadow-lg p-6 space-y-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-violet-400">How It Works</h2>
          <ul className="space-y-4 text-gray-300">
            <li>
              <strong className="text-white">Log Your Activities:</strong> Record what you did and for how long.
            </li>
            <li>
              <strong className="text-white">Add Duration:</strong> Every minute counts—track accurately.
            </li>
            <li>
              <strong className="text-white">View Your Progress:</strong> See daily, weekly, and monthly trends.
            </li>
            <li>
              <strong className="text-white">Stay Consistent:</strong> Build awareness and improve productivity.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-violet-400">Why Chronotrex?</h2>
          <ul className="space-y-3 text-gray-300">
            <li>✅ No overwhelming to-do lists</li>
            <li>✅ Simple & fast tracking</li>
            <li>✅ For students, devs & creators</li>
            <li>✅ Real effort tracking & discipline</li>
          </ul>
        </div>
      </div>
    </div>

    :

    <HeroPage />
    }
    </>
  );
};

export default LandingPage;
