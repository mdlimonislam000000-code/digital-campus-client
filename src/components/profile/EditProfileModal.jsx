'use client'
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditProfileModal = ({ isOpen, onClose, user, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    collegeName: '',
    department: '',
    studentId: '',
    birthday: '',
    phone: '',
    coverImage: '',
    portfolio: '',
    bio: '',
    presentAddress: '',
    permanentAddress: '',
  });

  const [loading, setLoading] = useState(false);

  // মডাল ওপেন হলে ইউজারের ডাটাবেজ থেকে আসা প্রোফাইল ডেটা ডাইনামিক্যালি ইনপুটে লোড হবে
  useEffect(() => {
    if (user && user.profile) {
      setFormData({
        collegeName: user.profile.collegeName || '',
        department: user.profile.department || '',
        studentId: user.profile.studentId || '',
        birthday: user.profile.birthday || '',
        phone: user.profile.phone || '',
        coverImage: user.profile.coverImage || '',
        portfolio: user.profile.portfolio || '',
        bio: user.profile.bio || '',
        presentAddress: user.profile.presentAddress || '',
        permanentAddress: user.profile.permanentAddress || '',
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userEmail = user?.email;

      if (!userEmail) {
        alert('User email missing from session!');
        setLoading(false);
        return;
      }

      // ডাটাবেজের বা সেশনের আগের পুরনো প্রোফাইল ডেটা
      const oldProfile = user?.profile || {};

      // ফলব্যাক লজিক: ইউজার যদি কোনো ইনপুট ফিল্ড পরিবর্তন না করে বা ফাঁকা রাখে, 
      // তবে পুরনো ডেটাই ধরে রাখা হবে, নতুন করে খালি স্ট্রিং দিয়ে ওভাররাইট হবে না।
      const finalPayload = {
        userId: user?.id || user?._id,
        email: user?.email,
        collegeName: formData.collegeName !== '' ? formData.collegeName : (oldProfile.collegeName || ''),
        department: formData.department !== '' ? formData.department : (oldProfile.department || ''),
        studentId: formData.studentId !== '' ? formData.studentId : (oldProfile.studentId || ''),
        birthday: formData.birthday !== '' ? formData.birthday : (oldProfile.birthday || ''),
        phone: formData.phone !== '' ? formData.phone : (oldProfile.phone || ''),
        coverImage: formData.coverImage !== '' ? formData.coverImage : (oldProfile.coverImage || ''),
        portfolio: formData.portfolio !== '' ? formData.portfolio : (oldProfile.portfolio || ''),
        bio: formData.bio !== '' ? formData.bio : (oldProfile.bio || ''),
        presentAddress: formData.presentAddress !== '' ? formData.presentAddress : (oldProfile.presentAddress || ''),
        permanentAddress: formData.permanentAddress !== '' ? formData.permanentAddress : (oldProfile.permanentAddress || ''),
      };

      // ব্যাকএন্ডে PATCH রিকোয়েস্ট পাঠানো
      const response = await fetch(`http://localhost:5000/api/users/profile/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalPayload),
      });

      const data = await response.json();

      if (data.success) {
        alert('Profile updated successfully!');
        onUpdateSuccess(data); // আপডেটেড ডাটা প্যারেন্টে পাঠানো
        onClose(); 
      } else {
        alert('Failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
              <input 
                type="text" 
                name="collegeName" 
                value={formData.collegeName} 
                onChange={handleChange}
                placeholder="Enter college name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department / Subject</label>
              <input 
                type="text" 
                name="department" 
                value={formData.department} 
                onChange={handleChange}
                placeholder="Enter department"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College / Student ID</label>
              <input 
                type="text" 
                name="studentId" 
                value={formData.studentId} 
                onChange={handleChange}
                placeholder="Enter student ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
              <input 
                type="date" 
                name="birthday" 
                value={formData.birthday} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Link</label>
              <input 
                type="url" 
                name="portfolio" 
                value={formData.portfolio} 
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Present Address</label>
              <input 
                type="text" 
                name="presentAddress" 
                value={formData.presentAddress} 
                onChange={handleChange}
                placeholder="Enter present address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
              <input 
                type="text" 
                name="permanentAddress" 
                value={formData.permanentAddress} 
                onChange={handleChange}
                placeholder="Enter permanent address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input 
              type="text" 
              name="coverImage" 
              value={formData.coverImage} 
              onChange={handleChange}
              placeholder="Paste cover image link here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio / About</label>
            <textarea 
              name="bio" 
              rows="3"
              value={formData.bio} 
              onChange={handleChange}
              placeholder="Write something about yourself..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            ></textarea>
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold text-sm transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

EditProfileModal.displayName = 'EditProfileModal';
export default EditProfileModal;