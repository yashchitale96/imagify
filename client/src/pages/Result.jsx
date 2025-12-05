import React, { useContext, useState } from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }

    setLoading(false)
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <img src={image} alt="" className="max-w-sm rounded-2xl" />
          <span
            className={`absolute bottom-0 left-0 h-2 bg-gradient-to-r from-purple-600 to-pink-600 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl">
            <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-800 font-semibold">Generating magic...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-white/50 backdrop-blur-md text-gray-700 text-sm p-1.5 mt-10 rounded-full shadow-xl border border-purple-200">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-gray-400 font-medium"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 sm:px-16 py-3 rounded-full cursor-pointer font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-4 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <button
            className="bg-white/50 backdrop-blur-md border-2 border-purple-300 text-gray-800 px-8 py-3 rounded-full cursor-pointer font-bold hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => {
              setIsImageLoaded(false);
            }}
          >
            🔄 Generate Another
          </button>
          <a
            href={image}
            download
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-3 rounded-full cursor-pointer font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12l-5-5h3V3h4v4h3l-5 5zm-7 7v-3h14v3H3z"/>
            </svg>
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
