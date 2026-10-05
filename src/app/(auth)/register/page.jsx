'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaImage } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signUp, signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      profileImage: null,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setValue('profileImage', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      let uploadedImageUrl = '';

      // 1. Jodi user image select kore thake, tahoke prothome Cloudinary-te upload korbo
      if (imageFile) {
        setUploading(true);
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
        setUploading(false);

        if (!uploadedImageUrl) {
          setErrorMessage('Image upload failed. Please try again.');
          return;
        }
      }

      // 2. Better Auth email/password signup with Cloudinary image URL (await add kora holo)
      const { data: responseData, error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: uploadedImageUrl || undefined,
      }, {
        onRequest: () => {
          // Loading state ba extra kaj thakle ekhane kora jabe
        },
        onSuccess: () => {
          router.push('/');
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message || 'Registration failed');
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      console.error(err);
      setUploading(false);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4 sm:p-6">
      
      {/* 1. Fullscreen Real Campus Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/campus pic.png" 
          alt="Campus Building" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-blue-950/70 to-indigo-950/80 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. Floating Glassmorphism Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl w-full bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto"
      >
        
        {/* Left Side Branding */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between text-white border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 px-3.5 py-1.5 rounded-full shadow-inner">
              Digital Campus v2.0
            </span>
            
            <h1 className="text-3xl lg:text-4xl font-extrabold mt-6 tracking-tight leading-tight text-white drop-shadow-md">
              Join Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Academic Ecosystem
              </span>
            </h1>
            
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Create your account now to access notices, courses, and department activities smoothly. You can update your academic profile later.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
            <span>Secure Registration</span>
            <span>© 2026 DigitalCampus</span>
          </div>
        </div>

        {/* Right Side Form with Sticky Header */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl flex flex-col max-h-[90vh] overflow-y-auto relative">
          
          {/* Sticky Header Box */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pt-8 pb-4 px-6 sm:px-8 border-b border-gray-100 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your details to get started
            </p>
          </div>

          {/* Form Scrollable Body */}
          <div className="p-6 sm:p-8 pt-6">
            <div className="max-w-md w-full mx-auto space-y-4">
              
              {/* Error Alert Box */}
              {errorMessage && (
                <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium text-center">
                  {errorMessage}
                </div>
              )}

              {/* Google Sign Up Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center space-x-2.5 py-3 px-4 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
              >
                <FcGoogle className="text-xl" />
                <span>Sign up with Google</span>
              </button>

              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="px-3 text-xs text-gray-400 uppercase tracking-wider font-semibold">or with email</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                
                {/* Profile Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Profile Image
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <FaImage className="text-gray-400 text-lg" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Full Name Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FaUser className="text-sm" />
                    </span>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Md Limon Mia"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-gray-50/50 text-gray-900 font-medium"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FaEnvelope className="text-sm" />
                    </span>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-gray-50/50 text-gray-900 font-medium"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FaLock className="text-sm" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-gray-50/50 text-gray-900 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="w-full mt-2 flex items-center justify-center space-x-2 py-3.5 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
                >
                  <FaUserPlus className="text-base" />
                  <span>{uploading ? 'Uploading Image...' : isSubmitting ? 'Creating...' : 'Create Account'}</span>
                </button>

                {/* Login Redirect Link */}
                <div className="text-center text-sm font-medium text-gray-600 pt-2 pb-4">
                  Already have an account?{' '}
                  <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition underline">
                    Sign in here
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default RegisterPage;