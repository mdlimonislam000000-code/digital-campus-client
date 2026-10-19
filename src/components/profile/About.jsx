'use client'
import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { FaGraduationCap, FaIdCard, FaBirthdayCake, FaPhone, FaLink, FaMapMarkerAlt, FaBookOpen } from 'react-icons/fa';

const About = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ইউজারের আসল _id দিয়ে ব্যাকএন্ড থেকে লেটেস্ট ডাটা ফেচ করা
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = user?.id || user?._id;
      if (!userId) return;
      
      try {
        const response = await fetch(`http://localhost:5000/api/users/id/${userId}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setDbUser(result.data);
        }
      } catch (error) {
        console.error("Error fetching profile by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // ডাটাবেজ বা সেশন থেকে প্রোফাইল অবজেক্ট নেওয়া
  const profile = dbUser?.profile || user?.profile || {};

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto mt-4 text-center text-gray-500">
        Loading about info...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-4xl mx-auto mt-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">About Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Navigation / Categories */}
        <div className="space-y-1 md:border-r md:pr-4">
          <button className="w-full text-left px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm transition">
            Overview
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition">
            Education & Work
          </button>
          <button className="w-full text-left px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition">
            Contact & Basic Info
          </button>
        </div>

        {/* Right Side: Details Information */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Bio Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Bio</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
              {profile.bio || "No bio added yet. Click 'Edit profile' to add one."}
            </p>
          </div>

          {/* Education & College Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Education</h3>
            
            {/* College Name */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg mt-1">
                <FaGraduationCap size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">College Name</p>
                <p className="font-semibold text-gray-800">{profile.collegeName }</p>
              </div>
            </div>

            {/* Department / Subject */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-purple-100 text-purple-600 rounded-lg mt-1">
                <FaBookOpen size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Department / Subject</p>
                <p className="font-semibold text-gray-800">{profile.department || "Not provided"}</p>
              </div>
            </div>

            {/* Student ID */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg mt-1">
                <FaIdCard size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-semibold text-gray-800">{profile.studentId || "Not provided"}</p>
              </div>
            </div>

          </div>

          {/* Contact and Basic Info */}
          <div className="space-y-4 pt-2 border-t">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contact & Basic Info</h3>

            <div className="flex items-center gap-3">
              <div className="p-2 text-gray-600 bg-gray-100 rounded-lg">
                <FaPhone size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">{profile.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 text-gray-600 bg-gray-100 rounded-lg">
                <FaBirthdayCake size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Birthday</p>
                <p className="font-medium text-gray-800">{profile.birthday || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 text-gray-600 bg-gray-100 rounded-lg">
                <FaMapMarkerAlt size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Present Address</p>
                <p className="font-medium text-gray-800">{profile.presentAddress || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 text-gray-600 bg-gray-100 rounded-lg">
                <FaMapMarkerAlt size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Permanent Address</p>
                <p className="font-medium text-gray-800">{profile.permanentAddress || "Not provided"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 text-gray-600 bg-gray-100 rounded-lg">
                <FaLink size={16} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Portfolio Website</p>
                {profile.portfolio ? (
                  <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                    {profile.portfolio}
                  </a>
                ) : (
                  <p className="font-medium text-gray-800">Not provided</p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default About;