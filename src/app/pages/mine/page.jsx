"use client";
import React, { Suspense, useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import "./Mine.css";
import BuyConfirmationModal from "@/components/BuyConfirmationModal/BuyConfirmationModal";
import UnlockConditionModal from "@/components/UnlockConditionModal/UnlockConditionModal";
import useUserData from "@/hooks/useUserData";
import { onValue, ref, set } from "firebase/database";
import { realtimeDb } from "@/config/firebase";

const Mine = () => {
  function Search() {
    const [activeTab, setActiveTab] = useState("Animals");
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [unlockCondition, setUnlockCondition] = useState("");
    const [coinCount, setCoinCount] = useState();
    const [profitPerHour, setProfitPerHour] = useState();
    const [cardLevels, setCardLevels] = useState({});

    const { userData } = useUserData();
    const userId = userData?.id || 0;

    const coinRef = ref(realtimeDb, `/users/${userId}/coins`);
    const profitPerHourRef = ref(realtimeDb, `/users/${userId}/profitPerHour`);
    const cardLevelsRef = ref(realtimeDb, `/users/${userId}/cardLevels`);

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

    useEffect(() => {
      const unsubscribe = onValue(cardLevelsRef, (snapshot) => {
        setCardLevels(snapshot.val() || {});
      });
      return () => unsubscribe();
    }, [cardLevelsRef]);

    const handleCardClick = (card, isUnlocked) => {
      setSelectedCard(card);
      if (isUnlocked) {
        setShowBuyModal(true);
      } else {
        setShowUnlockModal(true);
        setUnlockCondition(getUnlockCondition(card.title));
      }
    };

    const handleConfirmBuy = () => {
      if (coinCount >= selectedCard.price) {
        set(coinRef, coinCount - selectedCard.price);
        set(profitPerHourRef, profitPerHour + selectedCard.profitAmount);
        set(cardLevelsRef, {
          ...cardLevels,
          [selectedCard.title]: (cardLevels[selectedCard.title] || 0) + 1,
        });
        setShowBuyModal(false);
      }
    };

    const handleCancel = () => {
      setShowBuyModal(false);
      setShowUnlockModal(false);
    };

    const unlockConditions = {
      Guava: "Unlock Buffalo",
      Buffalo: "Unlock Shovel",
      Shovel: "Reach Orange level 3",
      Goose: "Unlock Wheel Barrow",
      "Wheel Barrow": "Unlock Jackfruit",
      Jackfruit: "Reach Sickle level 3",
      Tractor: "Unlock Teak",
      Teak: "Unlock Sheep",
      Sheep: "Reach Goat level 3",
      Peach: "Reach Apple level 3",
      Vegi: "Reach Pear level 3",
      Donkey: "Reach Hen level 3",
      Rabbit: "Reach Cow level 3",
      Feeder: "Reach Trowel level 3",
      Seeder: "Reach Sprayer level 3",
    };

    const getUnlockCondition = (title) => {
      return unlockConditions[title] || "Unknown condition";
    };

    const isCardUnlocked = (card) => {
      const condition = unlockConditions[card.title];
      if (!condition) return true;

      if (typeof condition === "string") {
        return cardLevels[condition] > 0;
      } else if (typeof condition === "object") {
        return (cardLevels[condition.level] || 0) >= condition.levelValue;
      }

      return true;
    };

    const renderCards = () => {
      let cards = [];
      let cardClass = "";

      if (activeTab === "Animals") {
        cards = [
          { title: "Hen", price: 1000, profitAmount: 1000, level: 1 },
          { title: "Cow", price: 1000, profitAmount: 1000, level: 1 },
          { title: "Goat", price: 1000, profitAmount: 1000, level: 1 },
          { title: "Dog", price: 1000, profitAmount: 1000, level: 1 },
          { title: "Duck", price: 2000, profitAmount: 1500, level: 1 },
          { title: "Sheep", price: 2000, profitAmount: 1500, level: 2 },
          { title: "Donkey", price: 2000, profitAmount: 1500, level: 2 },
          { title: "Rabbit", price: 2000, profitAmount: 1500, level: 2 },
          { title: "Goose", price: 2000, profitAmount: 1500, level: 2 },
          { title: "Buffalo", price: 2000, profitAmount: 1500, level: 2 },
          // Add more animal cards here
        ];
        cardClass = "animals";
      } else if (activeTab === "Trees") {
        cards = [
          { title: "Mango", price: 500, profitAmount: 500, level: 1 },
          { title: "Apple", price: 1000, profitAmount: 700, level: 1 },
          { title: "Orange", price: 1000, profitAmount: 700, level: 1 },
          { title: "Pear", price: 1000, profitAmount: 700, level: 1 },
          { title: "Lemon", price: 1000, profitAmount: 700, level: 1 },
          { title: "Peach", price: 1000, profitAmount: 700, level: 2 },
          { title: "Teak", price: 1000, profitAmount: 700, level: 2 },
          { title: "Guava", price: 1000, profitAmount: 700, level: 2 },
          { title: "Jackfruit", price: 1000, profitAmount: 700, level: 2 },
          { title: "Vegi", price: 1000, profitAmount: 700, level: 2 },
          // Add more tree cards here
        ];
        cardClass = "trees";
      } else if (activeTab === "Tools") {
        cards = [
          { title: "Trowel", price: 200, profitAmount: 100, level: 1 },
          { title: "Sickle", price: 300, profitAmount: 150, level: 1 },
          { title: "Pruning Shear", price: 300, profitAmount: 150, level: 1 },
          { title: "Rake", price: 300, profitAmount: 150, level: 1 },
          { title: "Sprayer", price: 300, profitAmount: 150, level: 1 },
          { title: "Feeder", price: 300, profitAmount: 150, level: 2 },
          { title: "Seeder", price: 300, profitAmount: 150, level: 2 },
          { title: "Shovel", price: 300, profitAmount: 150, level: 2 },
          { title: "Wheel Barrow", price: 300, profitAmount: 150, level: 2 },
          { title: "Tractor", price: 300, profitAmount: 150, level: 2 },
          // Add more tool cards here
        ];
        cardClass = "tools";
      }

      return cards.map((card, index) => {
        const isUnlocked = isCardUnlocked(card);
        return (
          <div
            className={` ${isUnlocked ? `card ${cardClass}` : "locked_card"}`}
            key={index}
            onClick={() => handleCardClick(card, isUnlocked)}
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
        );
      });
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
            show={showBuyModal}
            onClose={handleCancel}
            onConfirm={handleConfirmBuy}
            card={selectedCard}
          />
          <UnlockConditionModal
            show={showUnlockModal}
            onClose={handleCancel}
            condition={unlockCondition}
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
