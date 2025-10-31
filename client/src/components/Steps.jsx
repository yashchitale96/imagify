import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "motion/react";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      className="flex flex-col items-center justify-center my-32"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          How It Works
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Transform Words Into Stunning Images
        </p>
      </motion.div>

      <div className="space-y-6 w-full max-w-4xl">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex items-center gap-6 p-8 px-10 bg-white/50 backdrop-blur-md shadow-xl border border-white/20 cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 rounded-2xl card-hover"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
              <img width={40} src={item.icon} alt="" className="filter brightness-0 invert" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-gray-600 text-base">{item.description}</p>
            </div>
            <div className="text-6xl font-bold text-purple-200">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
