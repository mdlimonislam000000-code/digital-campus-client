'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaTimes, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ForgotPasswordModal({ isOpen, onClose, setEmail }) {
  const [inputEmail, setInputEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputEmail) {
      toast.error('দয়া করে আপনার ইমেইল লিখুন');
      return;
    }

    setLoading(true);
    try {
      // সরাসরি আমাদের তৈরি করা কাস্টম API রাউটে রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inputEmail,
          redirectTo: `${window.location.origin}/reset-password`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'কিছু সমস্যা হয়েছে।');
      }

      setEmail(inputEmail);
      toast.success('পাসওয়ার্ড রিসেট করার লিংক আপনার ইমেইলে পাঠানো হয়েছে!');
      onClose();
    } catch (error) {
      console.error('Error in forgot password request:', error);
      toast.error(error.message || 'আপনার এই ইমেইলে কোনো অ্যাকাউন্ট তৈরি করা নেই।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-100 relative text-gray-900"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl shadow-inner">
            <FaEnvelope />
          </div>
          <h3 className="text-2xl font-bold">Forgot Password?</h3>
          <p className="text-xs text-gray-500 mt-1">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FaPaperPlane /> Send Reset Link
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}