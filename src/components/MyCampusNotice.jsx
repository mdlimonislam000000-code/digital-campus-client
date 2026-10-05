import Link from 'next/link';
import React from 'react';
import { FaBullhorn, FaChevronRight } from 'react-icons/fa';

const MyCampusNotice = () => {
  return (
    <div>
      <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-200">
                  <Link 
                    href="/my-campus-notice" 
                    className="flex items-center justify-between group mb-3 p-2 rounded-lg bg-green-50/50 hover:bg-green-100/60 transition"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <FaBullhorn className="text-base" />
                      </div>
                      <span className="text-sm font-bold text-gray-800 group-hover:text-green-600">নিজ ক্যাম্পাসের নোটিশ</span>
                    </div>
                  </Link>

                  {/* 2-3 ta notice */}
                  <div className="flex flex-col space-y-2 pl-2">
                    <div className="border-l-2 border-green-500 pl-2.5 py-0.5">
                      <p className="text-xs text-gray-700 font-medium line-clamp-2 hover:text-green-600 cursor-pointer">
                        আমাদের ক্যাম্পাসের আইডি কার্ড বিতরণের নতুন তারিখ ঘোষণা।
                      </p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">05 Oct 2026</span>
                    </div>

                    <div className="border-l-2 border-green-500 pl-2.5 py-0.5">
                      <p className="text-xs text-gray-700 font-medium line-clamp-2 hover:text-green-600 cursor-pointer">
                        ক্যাম্পাস প্রাঙ্গণে বাৎসরিক ক্রীড়া প্রতিযোগিতা শুরু হবে।
                      </p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">03 Oct 2026</span>
                    </div>
                  </div>

                  {/* See All Button */}
                  <div className="mt-3 pt-2 border-t border-gray-100 text-right">
                    <Link href="/my-campus-notice" className="text-xs font-semibold text-green-600 hover:underline inline-flex items-center space-x-1">
                      <span>See All</span>
                      <FaChevronRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
    </div>
  );
};

export default MyCampusNotice;