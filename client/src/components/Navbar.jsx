import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

  const {user, setShowLogin, logout, credit} = useContext(AppContext);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between py-6 backdrop-blur-sm bg-white/30 rounded-2xl px-6 mt-4 shadow-lg border border-white/20">
        <Link to="/" className="transform hover:scale-105 transition-transform duration-300">
          <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40 drop-shadow-md" />
        </Link>

        <div>
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={()=>navigate('/buy')} 
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer font-medium"
              >
                <img className="w-5" src={assets.credit_star} alt="" />
                <p className="text-xs sm:text-sm">Credits: {credit}</p>
              </button>
              <p className="text-gray-700 max-sm:hidden pl-4 font-medium">Hi, {user.name}</p>
              <div className="relative group">
                <img
                  src={assets.profile_icon}
                  className="w-10 drop-shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
                  alt=""
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white/90 backdrop-blur-md rounded-xl border border-gray-200 text-sm shadow-xl min-w-[120px]">
                    <li onClick={logout} className="py-2 px-4 cursor-pointer hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-lg transition-all duration-300">
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-5">
              <p 
                onClick={() => navigate("/buy")} 
                className="cursor-pointer font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300"
              >
                Pricing
              </p>
              <button 
                onClick={()=>setShowLogin(true)} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 sm:px-10 text-sm rounded-full cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
