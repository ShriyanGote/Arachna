import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Welcome Text */}
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Welcome to Arachna
      </motion.h1>

      {/* Spider Emoji 🕷️ */}
      <motion.div
        className="text-7xl mt-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        🕷️
      </motion.div>
    </div>
  );
};

export default Home;
