import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser} = useContext(AppContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    try{
      if(state === 'Login'){
        const {data} = await axios.post(backendUrl + 'api/user/login', {email, password})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token);
          setShowLogin(false);
        }

        else{
          toast.error(data.message);
        }
      }

      else{
        
        const {data} = await axios.post(backendUrl+'api/user/register', {name, email, password}, {withCredentials:true})

        if(data.success){
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token);
          setShowLogin(false);
        }

        else{
          toast.error(data.message);
        }
      
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-md bg-black/40 flex justify-center items-center p-4">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl text-slate-500 shadow-2xl max-w-md w-full border border-purple-200"
      >
        <h1 className="text-center text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {state}
        </h1>
        <p className="text-sm text-center mb-6 text-gray-600">
          Welcome Back! Please sign in to continue
        </p>

        {state !== "Login" && (
          <div className="border-2 border-purple-200 px-6 py-3 flex items-center gap-3 rounded-2xl mt-5 bg-white/50 focus-within:border-purple-500 transition-all duration-300">
            <img className="max-h-7" src={assets.profile_icon} alt="" />
            <input
              type="text"
              className="outline-none text-sm bg-transparent flex-1 text-gray-700 font-medium"
              placeholder="Full Name"
              required
              onChange={e => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="border-2 border-purple-200 px-6 py-3 flex items-center gap-3 rounded-2xl mt-5 bg-white/50 focus-within:border-purple-500 transition-all duration-300">
          <img className="max-h-8" src={assets.email_icon} alt="" />
          <input
            type="email"
            className="outline-none text-sm bg-transparent flex-1 text-gray-700 font-medium"
            placeholder="Email Id"
            required
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="border-2 border-purple-200 px-6 py-3 flex items-center gap-3 rounded-2xl mt-5 bg-white/50 focus-within:border-purple-500 transition-all duration-300">
          <img className="max-h-8" src={assets.lock_icon} alt="" />
          <input
            type="password"
            className="outline-none text-sm bg-transparent flex-1 text-gray-700 font-medium"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <p className="text-sm text-purple-600 my-4 cursor-pointer hover:text-pink-600 transition-colors duration-300 font-medium">
          Forgot Password?
        </p>

        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl cursor-pointer font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer font-bold hover:text-pink-600 transition-colors duration-300"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer font-bold hover:text-pink-600 transition-colors duration-300"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <motion.img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          whileHover={{ scale: 1.1, rotate: 90 }}
          className="absolute top-5 right-5 cursor-pointer w-8 h-8 p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors duration-300"
        />
      </motion.form>
    </div>
  );
};

export default Login;
