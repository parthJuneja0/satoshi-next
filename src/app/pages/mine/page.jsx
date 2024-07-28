"use client";
import React, { useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import "./Mine.css";
import BuyConfirmationModal from "@/components/BuyConfirmationModal/BuyConfirmationModal";

const Mine = () => {
  const [activeTab, setActiveTab] = useState("Animals");
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleConfirmBuy = () => {
    // Handle the card purchase logic here
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const renderCards = () => {
    const cards = [
      { title: "CEO", price: "1K" },
      { title: "Marketing", price: "1K" },
      { title: "IT team", price: "2K" },
      { title: "Support team", price: "750" },
      { title: "HamsterBook", price: "500" },
      { title: "HamsterTube", price: "HamsterBook lvl 5" },
    ];

    return cards.map((card, index) => (
      <div className="card" key={index} onClick={() => handleCardClick(card)}>
        <div className="card-header">
          <FaUserTie className="icon colorful-icon" />
          <div>
            <p className="title">{card.title}</p>
            <p className="profit">Profit per hour</p>
            <p className="profit-amount">+100</p>
          </div>
        </div>
        <div className="card-separator"></div>
        <div className="card-footer">
          <p>lvl 0</p>
          <div className="vertical-separator"></div>
          <p>
            <GiTwoCoins className="footer-icon bright-coin-icon" /> {card.price}
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
          onConfirm={handleConfirmBuy}
          card={selectedCard}
        />
      </div>
    </div>
  );
};

export default Mine;
