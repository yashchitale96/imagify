import React, { useContext } from "react";
import { motion } from "motion/react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async(order) =>{
    console.log("initpay")
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=>{
        try{
          const {data} = await axios.post(backendUrl + 'api/user/verify-razor', response, {headers:{token:token}})
          console.log(data)
          if(data.success){
            loadCreditData();
            navigate('/')
            toast.success('Credit Added')
          }
        }
        catch(err){
          toast.error(err.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open();
  }
  const paymentRazorpay = async(planId) =>{
    try{
      if(!user){
        setShowLogin(true)
      }

      const data = await axios.post(backendUrl + 'api/user/pay-razor', {planId}, {headers:{token:token}})
      
      if(data.data.success){
        console.log("we come here")
        initPay(data.data.order)
      }
    }
    catch(err){
      toast.error(err)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <motion.button 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-2 border-purple-300 bg-white/50 backdrop-blur-md px-10 py-3 rounded-full mb-8 font-semibold text-gray-700 hover:scale-105 hover:border-purple-500 transition-all duration-300"
      >
        💎 Our Plans
      </motion.button>
      
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        Choose Your Plan
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-gray-600 text-lg mb-12"
      >
        Select the perfect package for your creative needs
      </motion.p>

      <div className="flex flex-wrap justify-center gap-8 text-left">
        {plans.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-white/60 backdrop-blur-md drop-shadow-xl border-2 border-purple-200 rounded-3xl py-12 px-10 text-gray-700 hover:border-purple-400 transition-all duration-500 shadow-xl"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <img width={40} src={assets.logo_icon} alt="" className="filter brightness-0 invert" />
            </div>
            
            <p className="mt-3 mb-2 font-bold text-2xl text-gray-800">{item.id}</p>
            <p className="text-sm text-gray-600 mb-6">{item.desc}</p>
            
            <div className="my-8 py-6 border-y-2 border-purple-200">
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${item.price}
              </p>
              <p className="text-gray-600 mt-2 font-medium">{item.credits} credits included</p>
            </div>
            
            <button 
              onClick={()=>paymentRazorpay(item.id)} 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white mt-8 text-base rounded-2xl py-3.5 min-w-52 cursor-pointer font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {user ? "Purchase Now 🚀" : "Get Started ✨"}
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Secure Payment</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Imagify?</h3>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="flex gap-3">
            <span className="text-3xl">⚡</span>
            <div>
              <h4 className="font-bold text-gray-800">Lightning Fast</h4>
              <p className="text-sm text-gray-600">Generate images in seconds</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-3xl">🎨</span>
            <div>
              <h4 className="font-bold text-gray-800">High Quality</h4>
              <p className="text-sm text-gray-600">Professional grade outputs</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-3xl">💎</span>
            <div>
              <h4 className="font-bold text-gray-800">Best Value</h4>
              <p className="text-sm text-gray-600">Affordable pricing plans</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BuyCredit;
