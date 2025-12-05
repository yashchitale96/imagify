import React, {useContext} from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
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
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-12 md:p-16 shadow-2xl mx-auto max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          See the Magic. Try Now ✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
        >
          Join thousands of creators who are already transforming their ideas into stunning visuals
        </motion.p>

        <motion.button 
          onClick={onClickHandler} 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-12 py-4 rounded-full bg-white text-purple-600 m-auto font-bold text-lg shadow-xl cursor-pointer transition-all duration-300"
        >
          Generate Images
          <img src={assets.star_group} alt="" className="h-6" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex justify-center gap-8 text-white/80 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span>Fast Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <span>Unlimited Creativity</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💎</span>
            <span>Premium Quality</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GenerateBtn;
