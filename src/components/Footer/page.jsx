"use client";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt, FaUserFriends, FaCoins } from "react-icons/fa";
import { BsMinecart } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [selected, setSelected] = useState();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") setSelected("exchange");
    else setSelected(pathname.split("/")[2]);
    console.log(pathname);
  }, [pathname]);

  const array = [
    {
      name: "exchange",
      icon: (
        <FaExchangeAlt
          className={`mx-auto ${
            selected === "exchange" ? "text-white" : "text-gray-500"
          }`}
          size={28}
        />
      ),
    },
    {
      name: "mine",
      icon: (
        <BsMinecart
          className={`mx-auto ${
            selected === "mine" ? "text-white" : "text-gray-500"
          }`}
          size={28}
        />
      ),
    },
    {
      name: "friends",
      icon: (
        <FaUserFriends
          className={`mx-auto ${
            selected === "friends" ? "text-white" : "text-gray-500"
          }`}
          size={28}
        />
      ),
    },
    {
      name: "earn",
      icon: (
        <FaCoins
          className={`mx-auto ${
            selected === "earn" ? "text-white" : "text-gray-500"
          }`}
          size={28}
        />
      ),
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-gray-900 flex justify-around items-center z-50 rounded-3xl text-xs p-2">
      {array.map((item, index) => (
        <Link
          href={item.name === "exchange" ? "/" : `/pages/${item.name}`}
          id={item.name}
          key={index}
        >
          <div
            className={`flex flex-col items-between text-center w-20 p-2 rounded-2xl transition-all duration-200 cursor-pointer ${
              selected === item.name
                ? " bg-gray-700 text-white shadow-md shadow-yellow-500"
                : "bg-gray-800 text-gray-500"
            }`}
          >
            {item.icon}
            <p
              className={`mt-1 ${
                selected === item.name ? "text-white" : "text-gray-500"
              }`}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
