import Link from 'next/link';
import React from 'react';
import { FaBuilding, FaChevronRight } from 'react-icons/fa';

const DipertmentNotice = () => {
  return (
    <div>
      <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-200">
                  <Link 
                    href="/department-notice" 
                    className="flex items-center justify-between group mb-3 p-2 rounded-lg bg-purple-50/50 hover:bg-purple-100/60 transition"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                        <FaBuilding className="text-base" />
                      </div>
                      <span className="text-sm font-bold text-gray-800 group-hover:text-purple-600">ডিপার্টমেন্টের নোটিশ</span>
                    </div>
                  </Link>

                  {/* 2-3 ta notice */}
                  <div className="flex flex-col space-y-2 pl-2">
                    <div className="border-l-2 border-purple-500 pl-2.5 py-0.5">
                      <p className="text-xs text-gray-700 font-medium line-clamp-2 hover:text-purple-600 cursor-pointer">
                        কম্পিউটার বিজ্ঞান বিভাগের ল্যাব ক্লাস রুটিন পরিবর্তন।
                      </p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">05 Oct 2026</span>
                    </div>

                    <div className="border-l-2 border-purple-500 pl-2.5 py-0.5">
                      <p className="text-xs text-gray-700 font-medium line-clamp-2 hover:text-purple-600 cursor-pointer">
                        অ্যাসাইনমেন্ট জম দেওয়ার শেষ সময় বৃদ্ধি করা হয়েছে।
                      </p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">02 Oct 2026</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100 text-right">
                    <Link href="/department-notice" className="text-xs font-semibold text-purple-600 hover:underline inline-flex items-center space-x-1">
                      <span>See All</span>
                      <FaChevronRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
    </div>
  );
};

export default DipertmentNotice;