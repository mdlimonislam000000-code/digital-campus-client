import Link from 'next/link';
import React from 'react';
import { FaChevronRight, FaUniversity } from 'react-icons/fa';

const AllCampusNotice = () => {
  return (
    <div>
      <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-200">
                  <Link 
                    href="/campus-notice" 
                    className="flex items-center justify-between group mb-3 p-2 rounded-lg bg-blue-50/50 hover:bg-blue-100/60 transition"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <FaUniversity className="text-base" />
                      </div>
                      <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600">সব ক্যাম্পাসের নোটিশ</span>
                    </div>
                  </Link>

                  {/* 2-3 ta notice */}
                  <div className="flex flex-col space-y-2 pl-2">
                    <div className="border-l-2 border-blue-500 pl-2.5 py-0.5">
                      <p className="text-xs text-gray-700 font-medium line-clamp-2 hover:text-blue-600 cursor-pointer">
                        সব ক্যাম্পাসের শিক্ষার্থীদের নিয়ে বিশেষ সেমিনার অনুষ্ঠিত হবে।
                      </p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">05 Oct 2026</span>
                    </div>

                    <div className="border-l-2 border-blue-500 pl-2.5 py-0.5">
                      <p className="text-xs text-gray-700 font-medium line-clamp-2 hover:text-blue-600 cursor-pointer">
                        আগামী শুক্রবার বিশ্ববিদ্যালয় ক্যাম্পাস বন্ধ থাকবে।
                      </p>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">04 Oct 2026</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100 text-right">
                    <Link href="/campus-notice" className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center space-x-1">
                      <span>See All</span>
                      <FaChevronRight className="text-[10px]" />
                    </Link>
                  </div>
                </div>
    </div>
  );
};

export default AllCampusNotice;