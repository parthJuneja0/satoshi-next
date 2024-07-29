"use client";
import React, { Suspense, useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import "./Mine.css";
import BuyConfirmationModal from "@/components/BuyConfirmationModal/BuyConfirmationModal";
import useUserData from "@/hooks/useUserData";
import { onValue, ref, set } from "firebase/database";
import { realtimeDb } from "@/config/firebase";

const Mine = () => {
  function Search() {
    const [activeTab, setActiveTab] = useState("Animals");
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [level, setLevel] = useState();
    const [coinCount, setCoinCount] = useState();
    const [profitPerHour, setProfitPerHour] = useState();

    const { userData } = useUserData();
    const userId = userData?.id || 0;

    const levelRef = ref(realtimeDb, `/users/${userId}/level`);
    const coinRef = ref(realtimeDb, `/users/${userId}/coins`);
    const profitPerHourRef = ref(realtimeDb, `/users/${userId}/profitPerHour`);

    useEffect(() => {
      const unsubscribe = onValue(levelRef, (snapshot) => {
        setLevel(snapshot.val());
      });
      return () => unsubscribe();
    }, [levelRef]);

    useEffect(() => {
      const unsubscribe = onValue(coinRef, (snapshot) => {
        setCoinCount(snapshot.val());
      });
      return () => unsubscribe();
    }, [coinRef]);

    useEffect(() => {
      const unsubscribe = onValue(profitPerHourRef, (snapshot) => {
        setProfitPerHour(snapshot.val());
      });
      return () => unsubscribe();
    }, [profitPerHourRef]);

    const handleCardClick = (card) => {
      setSelectedCard(card);
      setShowModal(true);
    };

    const handleConfirmBuy = () => {
      if (coinCount >= selectedCard.price) {
        set(coinRef, coinCount - selectedCard.price);
        set(profitPerHourRef, profitPerHour + selectedCard.profitAmount);
        setShowModal(false);
      }
    };

    const handleCancel = () => {
      setShowModal(false);
    };

    const renderCards = () => {
      const cards = [
        { title: "CEO", price: "1K", profitAmount: 1000, level: 1 },
        { title: "Marketing", price: "1K", profitAmount: 1000, level: 1 },
        { title: "IT team", price: "2K", profitAmount: 1000, level: 4 },
        { title: "Support team", price: "750", profitAmount: 1000, level: 1 },
        { title: "HamsterBook", price: "500", profitAmount: 1000, level: 0 },
        {
          title: "HamsterTube",
          price: "HamsterBook lvl 5",
          profitAmount: 1000,
          level: 3,
        },
      ];

      return cards.map((card, index) => (
        <div
          className={` ${level >= card.level ? "card" : "locked_card"}`}
          key={index}
          onClick={() => {
            if (level >= card.level) handleCardClick(card);
          }}
        >
          <div className="card-header">
            <FaUserTie className="icon colorful-icon" />
            <div>
              <p className="title">{card.title}</p>
              <p className="profit">Profit per hour</p>
              <p className="profit-amount">+{card.profitAmount}</p>
            </div>
          </div>
          <div className="card-separator"></div>
          <div className="card-footer">
            <p>lvl {card.level}</p>
            <div className="vertical-separator"></div>
            <p>
              <GiTwoCoins className="footer-icon bright-coin-icon" />{" "}
              {card.price}
            </p>
          </div>
        </div>
      ));
    };

    return (
      <div className="bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <div className="w-full text-white h-screen font-bold flex flex-col max-w-md relative">
          <div className="tabs">
            <button
              onClick={() => setActiveTab("Animals")}
              className={activeTab === "Animals" ? "active" : ""}
            >
              Animals
            </button>
            <button
              onClick={() => setActiveTab("Trees")}
              className={activeTab === "Trees" ? "active" : ""}
            >
              Trees
            </button>
            <button
              onClick={() => setActiveTab("Tools")}
              className={activeTab === "Tools" ? "active" : ""}
            >
              Tools
            </button>
          </div>
          <div className="mine-content p-6">
            <div className="card-grid">{renderCards()}</div>
          </div>
          <BuyConfirmationModal
            show={showModal}
            onClose={handleCancel}
            onConfirm={() => {
              handleConfirmBuy();
            }}
            card={selectedCard}
          />
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

export default Mine;
