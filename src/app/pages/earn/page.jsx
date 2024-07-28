"use client";
import React, { useEffect, useState } from "react";
import { FaYoutube, FaTelegramPlane, FaCheckCircle } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { SiX } from "react-icons/si";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { onValue, ref, set } from "firebase/database";
import { realtimeDb } from "@/config/firebase";
// import useUserId from "@/hooks/useUserId";

const Earn = () => {
  let youtubeReward = 10000;
  let telegramReward = 5000;
  let twitterReward = 5000;
  const [loading, setLoading] = useState(false);
  const [coinCount, setCoinCount] = useState();
  const [completedTasks, setCompletedTasks] = useState({
    youtube: false,
    telegram: false,
    twitter: false,
  });

  // const { userId } = useUserId();
  const userId = 5;
  const coinRef = ref(realtimeDb, `/users/${userId}/coins`);

  useEffect(() => {
    const unsubscribe = onValue(coinRef, (snapshot) => {
      setCoinCount(snapshot.val());
    });
    return () => unsubscribe();
  }, [coinRef]);

  const grantReward = (task) => {
    const reward = {
      youtube: youtubeReward,
      telegram: telegramReward,
      twitter: twitterReward,
    }[task];

    set(coinRef, coinCount + reward);
  };

  const handleLinkClick = (task) => {
    grantReward(task);
    setLoading(true);
    setTimeout(() => {
      setCompletedTasks((prevState) => ({
        ...prevState,
        [task]: true,
      }));
      setLoading(false);
    }, 2000); // Simulating network delay
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center items-center min-h-screen">
      {loading && (
        <div className="absolute z-50 flex items-center justify-center bg-black bg-opacity-75 w-full h-full">
          <AiOutlineLoading3Quarters className="text-white text-6xl animate-spin" />
        </div>
      )}
      <div className="w-full h-full rounded-3xl p-6 text-white max-w-md relative">
        <div className="flex justify-center mb-8">
          <GiTwoCoins className="text-yellow-400 text-9xl shadow-lg animate-pulse transition-transform duration-500 ease-in-out transform hover:scale-110 glow-coin" />
        </div>
        <h1
          className="text-4xl font-extrabold text-center gradient-text mb-8"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Earn more coins
        </h1>
        <div className="space-y-6">
          <a
            href="https://youtube.com/@satoshitvnews?si=UqJrEaQBhYwVWOi1"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={() => handleLinkClick("youtube")}
          >
            <div className="mt-6 bg-gray-800 text-white p-4 rounded-xl w-full flex items-center justify-between shadow-lg glow cursor-pointer">
              <div className="flex items-center">
                <FaYoutube className="text-red-600 text-4xl mr-4" />
                <div>
                  <p
                    className="text-xl font-bold"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Subscribe to our YouTube channel
                  </p>
                  <p
                    className="text-yellow-400 font-semibold"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    +{100000}
                  </p>
                </div>
              </div>
              {completedTasks.youtube && (
                <FaCheckCircle className="text-green-500 text-3xl checkmark" />
              )}
            </div>
          </a>
          <a
            href="https://t.me/+R5xP0HI-wp80OThl"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={() => handleLinkClick("telegram")}
          >
            <div className="mt-6 bg-gray-800 text-white p-4 rounded-xl w-full flex items-center justify-between shadow-lg glow cursor-pointer">
              <div className="flex items-center">
                <FaTelegramPlane className="text-blue-400 text-4xl mr-4" />
                <div>
                  <p
                    className="text-xl font-bold"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Join our Telegram group
                  </p>
                  <p
                    className="text-yellow-400 font-semibold"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    +{5000}
                  </p>
                </div>
              </div>
              {completedTasks.telegram && (
                <FaCheckCircle className="text-green-500 text-3xl checkmark" />
              )}
            </div>
          </a>
          <a
            href="https://x.com/satoshifarmss"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={() => handleLinkClick("twitter")}
          >
            <div className="mt-6 bg-gray-800 text-white p-4 rounded-xl w-full flex items-center justify-between shadow-lg glow cursor-pointer">
              <div className="flex items-center">
                <SiX className="text-blue-400 text-4xl mr-4" />
                <div>
                  <p
                    className="text-xl font-bold"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Follow us on X
                  </p>
                  <p
                    className="text-yellow-400 font-semibold"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    +{5000}
                  </p>
                </div>
              </div>
              {completedTasks.twitter && (
                <FaCheckCircle className="text-green-500 text-3xl checkmark" />
              )}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Earn;
