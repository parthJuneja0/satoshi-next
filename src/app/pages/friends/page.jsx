"use client";
import React from "react";
import { FaGift, FaUserPlus, FaUserFriends } from "react-icons/fa";
import "./Friends.css"; // Ensure you create and use this CSS file for additional styles

const page = () => {
  const inviteLink = "https://yourapp.com/invite";
  const telegramMessage = `Join me on this amazing app and receive bonuses! ${inviteLink}`;

  const handleTelegramInvite = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(telegramMessage)}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center items-center min-h-screen">
      <div className="w-full  text-white h-full font-bold flex flex-col max-w-md relative p-6 rounded-3xl g">
        <div className="w-full h-full rounded-3xl p-6 text-white">
          <h1 className="text-4xl font-extrabold text-center mb-4 gradient-text">
            Invite Friends!
          </h1>
          <p className="text-center mb-6 text-lg">
            You and your friend will receive bonuses
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex items-center bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaUserPlus className="w-10 h-10 text-yellow-400" />
              <div className="ml-4">
                <p className="text-lg font-bold">Invite a Friend</p>
                <p className="text-yellow-400">
                  +5,000 for you and your friend
                </p>
              </div>
            </div>
            <div className="flex items-center bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaUserFriends className="w-8 h-8 text-yellow-400" />
              <div className="ml-4">
                <p className="text-lg font-bold">
                  Invite a Friend with Telegram Premium
                </p>
                <p className="text-yellow-400">
                  +25,000 for you and your friend
                </p>
              </div>
            </div>
            <div className="flex items-center bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaGift className="w-12 h-12 text-yellow-400" />
              <div className="ml-4">
                <p className="text-lg font-bold">Special Gift</p>
                <p className="text-yellow-400">
                  Exclusive rewards for top inviters
                </p>
              </div>
            </div>
          </div>
          <button
            className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl w-full hover:bg-gradient-to-l transition-colors duration-300 glow"
            onClick={handleTelegramInvite}
          >
            Invite via Telegram
          </button>
          <p className="mt-6 text-gray-400 text-center">List of Your Friends</p>
          <div className="bg-gray-800 p-4 rounded-xl mt-4 shadow-md">
            <p className="text-gray-400 text-center">
              You haven&apos;t invited anyone yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
