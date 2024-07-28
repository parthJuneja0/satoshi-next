"use client";
import React, { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlineCrown } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import "./Leaderboard.css";
import { onValue } from "firebase/database";

const Leaderboard = ({ setView, usersRef }) => {
  const [players, setPlayers] = useState([]);
  const [sortedPlayers, setSortedPlayers] = useState();

  useEffect(() => {
    const unsubscribe = onValue(usersRef, (snapshot) => {
      setPlayers(Object.values(snapshot.val()));
    });

    return () => unsubscribe();
  }, [usersRef]);

  useEffect(() => {
    setSortedPlayers(players.slice().sort((a, b) => b.coins - a.coins));
  }, [players]);

  return (
    <div className="mx-auto flex flex-col justify-between items-center w-full h-full bg-black">
      <div className="relative flex flex-col items-center w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#333] rounded-lg shadow-lg p-6 overflow-y-auto">
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setView(false)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-600 transition-colors duration-300 focus:outline-none"
          >
            <BiArrowBack className="text-2xl text-white" />
          </button>
        </div>

        {/* Heading */}
        <div className="flex justify-center mb-6 w-full">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 heading-pattern relative">
            Leaderboard
          </h1>
        </div>

        {/* List */}
        {sortedPlayers && (
          <ul className="flex flex-col space-y-3 w-full">
            {sortedPlayers.map((player, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full mr-4 ${
                      index < 3 ? "bg-yellow-500 glow" : "bg-[#ff7f50]"
                    }`}
                  >
                    {index < 3 ? (
                      <AiOutlineCrown className="text-2xl text-yellow-300" />
                    ) : (
                      <span className="text-2xl text-white">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {player.username}
                  </span>
                </div>
                <div className="flex items-center">
                  <GiTwoCoins
                    className={`mr-2 ${
                      index < 3 ? "text-yellow-400 " : "text-gray-400"
                    }`}
                  />
                  <span className="text-xl font-bold text-white">
                    {player.coins}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
