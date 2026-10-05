'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaSearch, 
  FaGlobe, 
  FaGraduationCap, 
  FaBuilding, 
  FaChartLine, 
  FaCommentDots, 
  FaBell,
  FaBars,
  FaTimes,
  FaSignInAlt
} from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import Msseage from './Msseage';
import Notificaiton from './Notification';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null); // 'messages', 'notifications', or null
  
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;
  const user = session?.user;

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2">
          <div className="flex items-center justify-between w-full">
            
            {/* ১. বাঁ পাশ (Menu, Logo & Search) */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="lg:hidden p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none transition shrink-0"
              >
                <FaBars className="text-base sm:text-xl" />
              </button>

              <Link href="/" className="text-xs sm:text-lg md:text-2xl font-bold text-blue-600 tracking-tight sm:tracking-wide whitespace-nowrap shrink-0">
                Digital<span className="text-gray-800">Campus</span>
              </Link>
              
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
              <Link 
                href="/" 
                className={`flex flex-col items-center transition py-1 px-3 ${
                  isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'
                }`}
              >
                <FaGlobe className="text-xl mb-0.5" />
                <span className="text-xs">All Post</span>
              </Link>

              <Link 
                href="/campus" 
                className={`flex flex-col items-center transition py-1 px-3 ${
                  isActive('/campus') ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'
                }`}
              >
                <FaGraduationCap className="text-xl mb-0.5" />
                <span className="text-xs">My Campus</span>
              </Link>

              <Link 
                href="/department" 
                className={`flex flex-col items-center transition py-1 px-3 ${
                  isActive('/department') ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'
                }`}
              >
                <FaBuilding className="text-xl mb-0.5" />
                <span className="text-xs">My Department</span>
              </Link>

              {isLoggedIn && (
                <Link 
                  href="/dashboard/profile" 
                  className={`flex flex-col items-center transition py-1 px-3 ${
                    isActive('/dashboard/profile') ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'
                  }`}
                >
                  <FaChartLine className="text-xl mb-0.5" />
                  <span className="text-xs">Dashboard</span>
                </Link>
              )}
            </div>

            {/* ৩. ডান পাশ (Message, Notification & Profile or Login Button) */}
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              {isPending ? (
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              ) : isLoggedIn ? (
                <>
                  {/* মেসেজ আইকন (ক্লিক করলে সাইড প্যানেল খুলবে) */}
                  <button 
                    onClick={() => setActivePanel('messages')}
                    className="relative bg-gray-200 hover:bg-gray-300 p-1.5 sm:p-2.5 rounded-full text-gray-700 transition focus:outline-none"
                  >
                    <FaCommentDots className="text-sm sm:text-lg" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] sm:text-[10px] w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full flex items-center justify-center font-bold">3</span>
                  </button>

                  {/* নোটিফিকেশন আইকন (ক্লিক করলে সাইড প্যানেল খুলবে) */}
                  <button 
                    onClick={() => setActivePanel('notifications')}
                    className="relative bg-gray-200 hover:bg-gray-300 p-1.5 sm:p-2.5 rounded-full text-gray-700 transition focus:outline-none"
                  >
                    <FaBell className="text-sm sm:text-lg" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] sm:text-[10px] w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full flex items-center justify-center font-bold">5</span>
                  </button>

                  {/* প্রোফাইল সেকশন */}
                  <Link href="/profile" className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 p-1 rounded-full transition">
                    <img 
                      src={user?.image || "https://via.placeholder.com/150"} 
                      alt={user?.name || "Profile"} 
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-300 shrink-0"
                    />
                    <span className="hidden xl:inline text-sm font-medium text-gray-700 pr-2">{user?.name}</span>
                  </Link>
                </>
              ) : (
                <Link href="/login" className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* ফেসবুক স্টাইলের ডান পাশের সাইড প্যানেল (Messenger / Notifications) */}
      {activePanel && (
        <div className="fixed inset-0 z-50 flex justify-end pointer-events-none">
          {/* ব্যাকগ্রাউন্ড ওভারলে */}
          <div 
            className="fixed inset-0 pointer-events-auto bg-black/30 transition-opacity" 
            onClick={() => setActivePanel(null)}
          ></div>

          {/* প্যানেল কন্টেন্ট */}
          <div className="relative flex flex-col w-80 sm:w-96 max-w-full bg-white h-full shadow-2xl z-10 p-4 pointer-events-auto transition-transform transform translate-x-0 border-l border-gray-200">
            {/* হেডার */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {activePanel === 'messages' ? 'Chats & Messages' : 'Notifications'}
              </h2>
              <button 
                onClick={() => setActivePanel(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* ডায়নামিক বডি (এখানে আপনি আপনার মেসেজ বা নোটিফিকেশনের লিস্ট বা কম্পোনেন্ট বসাতে পারবেন) */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {activePanel === 'messages' ? (
                <Msseage />
              ) : (
                <Notificaiton></Notificaiton>
              )}
            </div>
          </div>
        </div>
      )}

      {/* মোবাইল সাইডবার ড্রয়ার */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden pointer-events-none">
          <div 
            className="fixed inset-0 pointer-events-auto bg-black/50" 
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
              <Link 
                href="/" 
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaGlobe className="text-lg" />
                <span>All Post</span>
              </Link>

              <Link 
                href="/campus" 
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive('/campus') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaGraduationCap className="text-lg" />
                <span>My Campus</span>
              </Link>

              <Link 
                href="/department" 
                onClick={() => setIsSidebarOpen(false)} 
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive('/department') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaBuilding className="text-lg" />
                <span>My Department</span>
              </Link>

              {isLoggedIn && (
                <Link 
                  href="/dashboard/profile" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive('/dashboard/profile') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaChartLine className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;