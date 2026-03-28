import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#020617] to-black text-white overflow-hidden relative">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          NiveshAI
        </h1>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-20">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          NiveshAI
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mt-4 text-lg sm:text-xl"
        >
          AI-Powered Smart Investment Intelligence
        </motion.p>

        {/* SINGLE BUTTON */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => navigate("/dashboard")}
          className="mt-10 px-8 py-4 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold text-lg hover:scale-105 transition"
        >
          Get Started 🚀
        </motion.button>
      </div>

      {/* 🔥 ANIMATED CHART */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] opacity-40">
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <motion.path
            fill="none"
            stroke="url(#grad)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
            d="M0,160L80,180L160,170L240,150L320,120L400,140L480,130L560,160L640,180L720,200L800,180L880,220L960,200L1040,240L1120,210L1200,250L1280,230L1360,260L1440,280"
          />

          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#00f5c4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
}