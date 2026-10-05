import React from 'react';

const Notificaiton = () => {
  return (
    <div>
      <div className="space-y-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">New Notifications</p>
                  {/* স্যাম্পল নোটিফিকেশন আইটেম */}
                  <div className="p-2.5 bg-blue-50/50 hover:bg-blue-50 rounded-lg cursor-pointer transition">
                    <p className="text-xs text-gray-800 font-medium">Tanvir Ahmed reacted to your post in My Campus.</p>
                    <span className="text-[10px] text-blue-500 mt-1 block">2 minutes ago</span>
                  </div>
                  <div className="p-2.5 hover:bg-gray-100 rounded-lg cursor-pointer transition">
                    <p className="text-xs text-gray-800 font-medium">Your department posted a new routine update.</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
    </div>
  );
};

export default Notificaiton;