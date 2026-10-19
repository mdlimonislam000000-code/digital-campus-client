
"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import {
    FaCamera,
    FaPen,
    FaPlus,
    FaEllipsisH,
} from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";

const ProfileHeader = ({ activeTab, setActiveTab }) => {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState({});

    const profileImage =
        user?.image || user?.imageURL || "";

    // Session থেকে profile data পাওয়া গেলে state update হবে
    useEffect(() => {
        setProfile({
            ...(user?.profile || {}),
        });
    }, [user]);

    // Development-এ ID যাচাই
    useEffect(() => {
        if (user) {
            console.log("Better Auth user:", user);
            // console.log("Better Auth user.id:", user.id);
            console.log("Better Auth user._id:", user._id);
        }
    }, [user]);

    // Profile save সফল হলে UI update হবে
    const handleProfileUpdate = (data) => {
        if (data?.profile) {
            setProfile((previous) => ({
                ...previous,
                ...data.profile,
            }));
        }
    };

    if (isPending) {
        return (
            <div className="bg-white p-8 text-center text-gray-500 shadow-sm">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-white p-8 text-center text-gray-500 shadow-sm">
                Please log in to view your profile.
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm">
            <div className="mx-auto max-w-6xl">
                {/* Cover Photo */}
                <div className="relative mt-0 h-48 w-full overflow-hidden rounded-b-xl bg-gray-300 sm:h-64 md:h-72">
                    <img
                        src={
                            profile.coverImage ||
                            "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1200"
                        }
                        alt="Cover"
                        className="h-full w-full object-cover"
                    />

                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-md transition hover:bg-gray-100"
                    >
                        <FaCamera />
                        Edit Cover Photo
                    </button>
                </div>

                {/* Profile Details */}
                <div className="px-4 pb-4 sm:px-8">
                    <div className="-mt-16 flex flex-col items-center justify-between gap-4 sm:-mt-20 md:-mt-12 md:flex-row md:items-end">
                        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
                            {/* Profile Image */}
                            <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg sm:h-40 sm:w-40">
                                <img
                                    src={
                                        profileImage ||
                                        "https://placehold.co/150x150?text=Profile"
                                    }
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    aria-label="Edit profile"
                                    className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-800 shadow hover:bg-gray-300"
                                >
                                    <FaCamera size={16} />
                                </button>
                            </div>

                            {/* User Information */}
                            <div className="mb-2">
                                <h1 className="text-2xl font-bold sm:text-3xl">
                                    {user.name || "User"}
                                </h1>

                                {user.email && (
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                )}

                                {profile.department && (
                                    <p className="text-sm text-gray-600">
                                        {profile.department}
                                    </p>
                                )}

                                {profile.collegeName && (
                                    <p className="text-sm text-gray-600">
                                        {profile.collegeName}
                                    </p>
                                )}

                                <p className="text-sm font-medium text-gray-500">
                                    1.2k connected
                                </p>

                                <div className="mt-2 flex items-center justify-center -space-x-2 sm:justify-start">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <img
                                            key={i}
                                            className="h-8 w-8 rounded-full border-2 border-white object-cover"
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="Connection"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex w-full items-center justify-center gap-2 md:w-auto">
                            <button
                                type="button"
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 md:flex-none"
                            >
                                <FaPlus />
                                Add to story
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300 md:flex-none"
                            >
                                <FaPen />
                                Edit profile
                            </button>

                            <button
                                type="button"
                                aria-label="More options"
                                className="cursor-pointer rounded-lg bg-gray-200 p-2.5 text-gray-800 transition hover:bg-gray-300"
                            >
                                <FaEllipsisH />
                            </button>
                        </div>
                    </div>

                    <hr className="my-4 border-gray-200" />
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={user}
                profile={profile}
                mongoUserId={user.id}
                onUpdateSuccess={handleProfileUpdate}
            />
        </div>
    );
};

export default ProfileHeader;
