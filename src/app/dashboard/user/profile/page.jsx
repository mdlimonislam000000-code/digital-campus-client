'use client';
import React, { useState } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AllTab from '@/components/profile/AllTab';
import FriendsTab from '@/components/profile/FriendsTab';
import PhotosTab from '@/components/profile/PhotosTab';
import VideosTab from '@/components/profile/VideosTab';
import About from '@/components/profile/About';

const Profile = () => {
  // সক্রিয় ট্যাবের স্টেট (ডিফল্ট থাকবে 'all')
  const [activeTab, setActiveTab] = useState('all');

  // ইউজার ক্লিক করলে সক্রিয় কম্পোনেন্ট রেন্ডার করার ফাংশন
  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return <AllTab />;
      case 'about':
        return <About />;
      case 'friends':
        return <FriendsTab />;
      case 'photos':
        return <PhotosTab />;
      case 'videos':
        return <VideosTab />;
      default:
        return <AllTab />;
    }
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'about', label: 'About' },
    { id: 'friends', label: 'Friends' },
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-12 font-sans text-gray-900">
      
      {/* প্রোফাইল হেডার */}
      <ProfileHeader />

      <div className="max-w-6xl mx-auto px-4 mt-4">
        {/* নেভিগেশন বাটন সেকশন */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-4 flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg font-semibold text-sm capitalize transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ডায়নামিক কনটেন্ট সেকশন (বাটনে ক্লিক করার উপর ভিত্তি করে এটি পরিবর্তন হবে) */}
        <div>
          {renderTabContent()}
        </div>
      </div>

    </div>
  );
};

export default Profile;