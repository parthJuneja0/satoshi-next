"use client";
import { useState, useEffect, Suspense } from "react";

// Icon imports
import { FiDollarSign } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { GiTwoCoins } from "react-icons/gi";
import mainCharacter from "../assets/main.png";

// Custom hook
import useUserData from "@/hooks/useUserData";

// Database imports
import { realtimeDb } from "@/config/firebase";
import { ref, set, get } from "firebase/database";
import Image from "next/image";
import Leaderboard from "../components/Leaderboard/page";
import Settings from "../components/Settings/page";

export default function Home() {
  function Search() {
    const { userData } = useUserData();
    const userId = userData?.id || 0;
    const firstName = userData?.first_name || "Guest";
    const lastName = userData?.last_name || "Account";
    const username = `${firstName} ${lastName}`;

    const [userInfo, setUserInfo] = useState({
      username,
      coins: 0,
      pointsToAdd: 1,
      totalEnergy: 1500,
      currentEnergy: 1500,
      yieldPerHour: 0,
      completedTasks: {
        youtube: false,
        telegram: false,
        twitter: false,
      },
    });
    const [hasMounted, setHasMounted] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [leaderboardOpen, setLeaderboardOpen] = useState(false);
    const [imageClicked, setImageClicked] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [showAnimation, setShowAnimation] = useState(false);

    // Database references
    const usersRef = ref(realtimeDb, `/users`);
    const userRef = ref(realtimeDb, `/users/${userId}`);

    // fetch user data
    useEffect(() => {
      const fetchUserDetails = async () => {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserInfo(snapshot.val());
          setHasMounted(true);
        } else {
          // Set initial values only if user doesn't exist
          await set(userRef, {
            username,
            coins: 0,
            pointsToAdd: 1,
            totalEnergy: 1500,
            currentEnergy: 1500,
            yieldPerHour: 0,
            completedTasks: {
              youtube: false,
              telegram: false,
              twitter: false,
            },
          });
        }
      };

      fetchUserDetails();
    }, []);

    // Sync user data with database
    useEffect(() => {
      if (hasMounted) {
        set(userRef, userInfo);
      }
    }, [userInfo, hasMounted]);

    // // Increase energy every second
    useEffect(() => {
      if (!hasMounted) return;
      const intervalId = setInterval(() => {
        setUserInfo((prevValue) => ({
          ...prevValue,
          currentEnergy: Math.min(
            prevValue.currentEnergy + 1,
            prevValue.totalEnergy
          ),
        }));
      }, 1000);
      return () => clearInterval(intervalId);
    }, [hasMounted, userInfo]);

    // Increase coins as per yield per hour
    useEffect(() => {
      if (userInfo.yieldPerHour === 0 || !hasMounted) return;
      const intervalId = setInterval(() => {
        setUserInfo((prevValue) => ({
          ...prevValue,
          coins: prevValue.coins + 1,
        }));
      }, Math.floor(1 / (userInfo.yieldPerHour / 3600)) * 1000);
      return () => clearInterval(intervalId);
    }, [hasMounted, userInfo]);

    const handleCardClick = (e) => {
      if (e.target.tagName === "IMG" && hasMounted) {
        setImageClicked(true);
        setShowAnimation(true);
        const rect = e.target.getBoundingClientRect();
        setClickPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setUserInfo((prevValue) => ({
          ...prevValue,
          coins: prevValue.coins + prevValue.pointsToAdd,
          currentEnergy: prevValue.currentEnergy - prevValue.pointsToAdd,
        }));

        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
        setTimeout(() => setShowAnimation(false), 500);
        setTimeout(() => setImageClicked(false), 500);
      }
    };

    const toggleSettings = () => {
      setSettingsOpen(!settingsOpen);
    };

    const toggleLeaderboard = () => {
      setLeaderboardOpen(!leaderboardOpen);
    };

    return (
      <div className="w-full flex flex-col justify-between">
        <div className="flex-grow">
          <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center">
            <div className="w-full text-white h-screen font-bold flex flex-col max-w-md relative">
              {settingsOpen ? (
                <Settings toggleSettings={toggleSettings} />
              ) : leaderboardOpen ? (
                <>
                  <Leaderboard
                    setView={toggleLeaderboard}
                    usersRef={usersRef}
                  />
                </>
              ) : (
                <>
                  <div className="px-4 z-10">
                    <div className="flex items-center space-x-2 pt-4">
                      <div
                        className="p-1 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 cursor-pointer"
                        onClick={() => {
                          toggleLeaderboard();
                        }}
                      >
                        <FaUserCircle size={24} className="text-white" />
                      </div>
                      <div>
                        {username ? (
                          <h1 className="text-lg text-glow">{username}</h1>
                        ) : (
                          <p>Loading username...</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          toggleLeaderboard();
                        }}
                      >
                        <div className="flex flex-col items-start">
                          <div className="w-full justify-between flex">
                            <p className="text-sm">Level</p>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="w-20 h-2 bg-gray-700 rounded-full">
                              <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center bg-gray-800 border-2 border-gray-700 rounded-full px-4 py-2 max-w-64 profit-area">
                        <div className="flex items-center">
                          <FiDollarSign className="w-8 h-8 text-yellow-400 mr-2" />
                          <div className="h-[32px] w-[2px] bg-gray-700 mx-2"></div>
                          <div className="flex-1 text-center"> 
                            <p className="text-xs text-gray-400 font-medium">
                              Yield per hour
                            </p>
                            <div className="flex items-center justify-center space-x-1">
                              <GiTwoCoins className="w-[18px] h-[18px] text-yellow-400" />
                              <p className="text-sm">{userInfo.yieldPerHour}</p>
                            </div>
                          </div>
                          <div className="h-[32px] w-[2px] bg-gray-700 mx-2"></div>
                          <IoMdSettings
                            onClick={() => {
                              toggleSettings();
                            }}
                            className="text-yellow-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="flex flex-col items-start w-1/2">
                        {" "}
                        {/* Adjusted width to 50% */}
                        <div className="flex justify-between w-full mb-1">
                          <p className="text-xs text-gray-600">Energy</p>
                          <p className="text-xs text-gray-600">{`${userInfo.currentEnergy}/${userInfo.totalEnergy}`}</p>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full relative overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-width duration-300 ease-in-out shadow-lg"
                            style={{
                              width: `${
                                (userInfo.currentEnergy * 100) /
                                userInfo.totalEnergy
                              }%`,
                              boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)", // Added glow effect
                            }}
                          ></div>
                          <div
                            className="absolute top-0 transform -translate-x-1/2 h-3 w-3 rounded-full bg-green-500 shadow-md glow-pulse transition-left duration-300 ease-in-out"
                            style={{
                              left: `${
                                (userInfo.currentEnergy * 100) /
                                userInfo.totalEnergy
                              }%`,
                              boxShadow: "0 0 8px rgba(0, 255, 0, 0.5)", // Added glow effect
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow mt-4 mb-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-[48px] relative top-glow z-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`relative flex flex-col gap-3 items-center justify-center cursor-pointer w-80 h-80 ${
                          imageClicked ? "shake" : ""
                        }`}
                        onClick={(e) => {
                          handleCardClick(e);
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image src={mainCharacter} alt="Main Character" />
                          {showAnimation && (
                            <div
                              className="click-animation"
                              style={{
                                top: `${clickPosition.y - 30}px`,
                                left: `${clickPosition.x - 30}px`,
                              }}
                            >
                              +1{" "}
                              <GiTwoCoins className="inline text-yellow-400" />
                            </div>
                          )}
                        </div>
                        <p className="text-3xl bottom-24 text-white">
                          {userInfo.coins}
                          <GiTwoCoins className="inline text-yellow-400" />
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
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
}
