'use client';
import React, { useState } from 'react';
import { 
  FaSearch, 
  FaGlobe, 
  FaGraduationCap, 
  FaBuilding, 
  FaChartLine, 
  FaCommentDots, 
  FaBell,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 w-full px-2 sm:px-4 py-2">
        <div className="flex items-center justify-between w-full">
          
          {/* ১. বাঁ পাশ (Menu, Logo & Search) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* মোবাইল সাইডবার ওপেন করার জন্য হ্যামবার্গার মেনু */}
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none transition"
            >
              <FaBars className="text-base sm:text-xl" />
            </button>

            {/* লোগো টেক্সট */}
            <a href="#" className="text-xs sm:text-lg md:text-2xl font-bold text-blue-600 tracking-tight sm:tracking-wide whitespace-nowrap">
              Digital<span className="text-gray-800">Campus</span>
            </a>
            
            {/* সার্চ বক্স */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FaSearch className="text-gray-400 text-xs" />
              </span>
              <input 
                type="text" 
                placeholder="খুঁজুন..." 
                className="bg-gray-100 text-xs rounded-full pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 sm:w-32 md:w-48 lg:w-60"
              />
            </div>
          </div>

          {/* ২. ডেস্কটপ মাঝখানের অপশনগুলো */}
          <div className="hidden lg:flex items-center justify-center space-x-6 text-gray-600 font-medium">
            <a href="#" className="flex flex-col items-center hover:text-blue-600 transition py-1 text-blue-600 border-b-2 border-blue-600 px-3">
              <FaGlobe className="text-xl mb-0.5" />
              <span className="text-xs">All Post</span>
            </a>
            <a href="#" className="flex flex-col items-center hover:text-blue-600 transition py-1 px-3">
              <FaGraduationCap className="text-xl mb-0.5" />
              <span className="text-xs">My Campus</span>
            </a>
            <a href="#" className="flex flex-col items-center hover:text-blue-600 transition py-1 px-3">
              <FaBuilding className="text-xl mb-0.5" />
              <span className="text-xs">My Department</span>
            </a>
            <a href="#" className="flex flex-col items-center hover:text-blue-600 transition py-1 px-3">
              <FaChartLine className="text-xl mb-0.5" />
              <span className="text-xs">Dashboard</span>
            </a>
          </div>

          {/* ৩. ডান পাশ (Message, Notification & Profile) */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            {/* মেসেজ আইকন */}
            <a href="#" className="relative bg-gray-200 hover:bg-gray-300 p-1.5 sm:p-2.5 rounded-full text-gray-700 transition">
              <FaCommentDots className="text-sm sm:text-lg" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] sm:text-[10px] w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full flex items-center justify-center font-bold">3</span>
            </a>

            {/* নোটিফিকেশন আইকন */}
            <a href="#" className="relative bg-gray-200 hover:bg-gray-300 p-1.5 sm:p-2.5 rounded-full text-gray-700 transition">
              <FaBell className="text-sm sm:text-lg" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] sm:text-[10px] w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full flex items-center justify-center font-bold">5</span>
            </a>

            {/* প্রোফাইল সেকশন */}
            <a href="#" className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Profile" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-300 shrink-0"
              />
              <span className="hidden xl:inline text-sm font-medium text-gray-700 pr-2">Limon</span>
            </a>
          </div>

        </div>
      </nav>

      {/* মোবাইল সাইডবার ড্রয়ার (Kalo background ti tule dewa hoyeche) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden pointer-events-none">
          {/* Transparent click area baire click korle close korar jonno */}
          <div 
            className="fixed inset-0 pointer-events-auto" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="relative flex flex-col w-56 sm:w-64 max-w-full bg-white h-full shadow-xl z-10 p-3 pointer-events-auto transition-transform transform translate-x-0">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
              <span className="text-base font-bold text-blue-600">Menu</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <a href="#" className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-blue-600 bg-blue-50 text-sm font-medium transition">
                <FaGlobe className="text-lg" />
                <span>All Post</span>
              </a>
              <a href="#" className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium transition">
                <FaGraduationCap className="text-lg" />
                <span>My Campus</span>
              </a>
              <a href="#" className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium transition">
                <FaBuilding className="text-lg" />
                <span>My Department</span>
              </a>
              <a href="#" className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium transition">
                <FaChartLine className="text-lg" />
                <span>Dashboard</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;