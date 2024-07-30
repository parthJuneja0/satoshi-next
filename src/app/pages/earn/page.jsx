"use client";
import React, { Suspense, useEffect, useState } from "react";
import { FaYoutube, FaTelegramPlane, FaCheckCircle } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { SiX } from "react-icons/si";
import { get, ref, set } from "firebase/database";
import { realtimeDb } from "@/config/firebase";
import useUserData from "@/hooks/useUserData";

const Earn = () => {
  function Search() {
    let youtubeReward = 10000;
    let telegramReward = 5000;
    let twitterReward = 5000;
    const [userInfo, setUserInfo] = useState({});
    const [hasMounted, setHasMounted] = useState(false);

    const { userData } = useUserData();
    const userId = userData?.id || 0;

    const userRef = ref(realtimeDb, `/users/${userId}`);

    // Fetch user details
    useEffect(() => {
      const fetchUserDetails = async () => {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserInfo(snapshot.val());
          setHasMounted(true);
        }
      };
      fetchUserDetails();
    }, []);

    // Sync user data with database
    useEffect(() => {
      if (hasMounted) {
        console.log(userInfo.completedTasks);
        set(userRef, userInfo);
      }
    }, [userInfo, hasMounted]);

    const grantReward = (task) => {
      const reward = {
        youtube: youtubeReward,
        telegram: telegramReward,
        twitter: twitterReward,
      }[task];

      setUserInfo((prevValue) => ({
        ...prevValue,
        coins: prevValue.coins + reward,
      }));
    };

    const handleLinkClick = async (task) => {
      if (userInfo.completedTasks && userInfo.completedTasks[task]) return;
      setUserInfo((prevValue) => ({
        ...prevValue,
        completedTasks: { ...prevValue.completedTasks, [task]: true },
      }));
      grantReward(task);
    };

    return (
      <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center items-center min-h-screen">
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
                      +{youtubeReward}
                    </p>
                  </div>
                </div>
                {userInfo.completedTasks && userInfo.completedTasks.youtube && (
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
                      +{telegramReward}
                    </p>
                  </div>
                </div>
                {userInfo.completedTasks &&
                  userInfo.completedTasks.telegram && (
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
                      +{twitterReward}
                    </p>
                  </div>
                </div>
                {userInfo.completedTasks && userInfo.completedTasks.twitter && (
                  <FaCheckCircle className="text-green-500 text-3xl checkmark" />
                )}
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};

export default Earn;
