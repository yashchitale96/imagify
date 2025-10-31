import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32 p-6 md:px-28"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create AI Images
        </h1>
        <p className="text-gray-500 text-lg font-medium">Turn your imagination into visuals</p>
      </motion.div>

      <div className="flex flex-col gap-10 md:gap-16 md:flex-row items-center bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-2xl shadow-2xl border-4 border-white hover:scale-105 transition-transform duration-500"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold max-w-lg mb-6 text-gray-800">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-5 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life instantly.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don't yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>
          
          <div className="mt-8 flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
              <span className="text-2xl">⚡</span>
              <span className="text-sm font-semibold text-purple-700">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full">
              <span className="text-2xl">🎨</span>
              <span className="text-sm font-semibold text-pink-700">Creative AI</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-semibold text-orange-700">High Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Description;
