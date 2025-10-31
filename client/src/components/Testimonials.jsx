import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "motion/react";
const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Customer Testimonials
        </h1>
        <p className="text-gray-500 text-lg font-medium">What Our Users Are Saying</p>
      </motion.div>

      <div className="flex flex-wrap gap-8 justify-center">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 w-80 m-auto cursor-pointer hover:scale-[1.05] hover:shadow-2xl transition-all duration-300 card-hover"
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={testimonial.image}
                  alt=""
                  className="rounded-full w-16 h-16 object-cover border-4 border-purple-200 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l-2-2-1.5 1.5L9 15l7-7-1.5-1.5L9 12z"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold mt-2 text-gray-800">{testimonial.name}</h2>
              <p className="text-purple-600 mb-4 font-medium text-sm">{testimonial.role}</p>
              <div className="flex mb-5 gap-1">
                {Array(testimonial.stars)
                  .fill()
                  .map((item, index) => (
                    <img key={index} src={assets.rating_star} alt="" className="w-5 h-5" />
                  ))}
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl">
                <p className="text-center text-sm text-gray-700 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
