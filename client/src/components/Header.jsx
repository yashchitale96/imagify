import React, { useContext } from "react";
import { assets } from "../assets/assets";
import {AppContext} from '../context/AppContext'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const {user, setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () =>{
    if(user){
      navigate('/result')
    }

    else{
      setShowLogin(true);
    }
  }

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="inline-flex text-center gap-2 bg-white/40 backdrop-blur-md px-8 py-3 rounded-full border border-purple-200 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-gray-700 font-medium">🌟 Best Text To Image Generator</p>
        <img src={assets.star_icon} alt="" className="w-5" />
      </motion.div>

      <motion.h1
        className="text-5xl max-w-[320px] sm:text-7xl sm:max-w-[650px] mx-auto mt-10 text-center font-bold leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Turn Text to <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">Image</span>, in Seconds.
      </motion.h1>

      <motion.p
        className="text-center max-w-xl mx-auto mt-6 text-gray-600 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash your creativity with AI. Transform your imagination into stunning visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>

      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 w-auto mt-10 px-12 py-4 flex items-center gap-3 rounded-full cursor-pointer shadow-xl hover:shadow-2xl font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>

      <motion.div
        className="flex flex-wrap justify-center mt-20 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer max-sm:w-14 border-4 border-white"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              key={index}
              width={80}
            />
          ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-4 text-gray-500 font-medium"
      >
        ✨ Generated Images from Imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
