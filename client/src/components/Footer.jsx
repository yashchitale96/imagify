import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-6 mt-20 border-t border-purple-200 backdrop-blur-sm bg-white/20 px-6 rounded-t-2xl'>
        <img src={assets.logo} alt="" width={150} className="opacity-90" />
        
        <p className='flex-1 border-l border-purple-300 pl-4 text-sm text-gray-600 max-sm:hidden font-medium'>
          Copyright © Imagify 2025 | All rights reserved.
        </p>

        <div className='flex gap-3'>
            <a href="#" className="transform hover:scale-110 transition-transform duration-300">
              <img src={assets.facebook_icon} alt="" width={35} className="opacity-70 hover:opacity-100"/>
            </a>
            <a href="#" className="transform hover:scale-110 transition-transform duration-300">
              <img src={assets.twitter_icon} alt="" width={35} className="opacity-70 hover:opacity-100"/>
            </a>
            <a href="#" className="transform hover:scale-110 transition-transform duration-300">
              <img src={assets.instagram_icon} alt="" width={35} className="opacity-70 hover:opacity-100"/>
            </a>
        </div>
    </div>
  )
}

export default Footer