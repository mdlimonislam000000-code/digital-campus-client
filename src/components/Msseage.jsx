import React from 'react';

const Msseage = () => {
  return (
    <div>
      <div className="space-y-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Recent Messages</p>
                  {/* স্যাম্পল মেসেজ আইটেম */}
                  <div className="p-2.5 hover:bg-gray-100 rounded-lg cursor-pointer transition flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">A</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Ashikur Rahman</h4>
                      <p className="text-xs text-gray-500 truncate">Vai, assignment ta ki complete hoise?</p>
                    </div>
                  </div>
                  <div className="p-2.5 hover:bg-gray-100 rounded-lg cursor-pointer transition flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">D</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Department Group</h4>
                      <p className="text-xs text-gray-500 truncate">Notice: Class tomorrow at 10 AM.</p>
                    </div>
                  </div>
                </div>
    </div>
  );
};

export default Msseage;