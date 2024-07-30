"use client";
import React, { useState } from "react";
import { FaAppleAlt, FaSeedling, FaOilCan } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import Image from "next/image";
import food from "../../../assets/shop/animalfood.png"; // Import the image
import fertilizer from "../../../assets/shop/fertilizer.png"; // Import the image
import oil from "../../../assets/shop/oil.png"; // Import the image
import './Shop.css'; // Import the CSS file

const products = {
  food: {
    name: "Apple",
    price: 10,
    image: food, // Add the correct path to your image
    details: "A fresh apple, perfect for a healthy snack.",
  },
  fertilizer: {
    name: "Compost",
    price: 15,
    image: fertilizer, // Add the correct path to your image
    details: "Organic compost to enrich your garden soil.",
  },
  oil: {
    name: "Olive Oil",
    price: 30,
    image: oil, // Add the correct path to your image
    details: "High-quality olive oil for cooking and salads.",
  },
};

const Shop = () => {
  const [quantities, setQuantities] = useState({
    food: 1,
    fertilizer: 1,
    oil: 1,
  });
  const [balances, setBalances] = useState({
    food: 100,
    fertilizer: 50,
    oil: 25,
    coins: 200,
  });

  const items = [
    {
      category: "Food",
      icon: <FaAppleAlt size={24} />,
      product: products.food,
      glowClass: "glow-yellow",
    },
    {
      category: "Fertilizer",
      icon: <FaSeedling size={24} />,
      product: products.fertilizer,
      glowClass: "glow-green",
    },
    {
      category: "Oil",
      icon: <FaOilCan size={24} />,
      product: products.oil,
      glowClass: "glow-white",
    },
  ];

  const increaseQuantity = (category) => {
    setQuantities({ ...quantities, [category]: quantities[category] + 1 });
  };

  const decreaseQuantity = (category) => {
    if (quantities[category] > 1) {
      setQuantities({ ...quantities, [category]: quantities[category] - 1 });
    }
  };

  const purchaseItem = (category) => {
    const cost = products[category].price * quantities[category];
    if (balances.coins >= cost) {
      setBalances({
        ...balances,
        [category]: balances[category] + quantities[category],
        coins: balances.coins - cost,
      });
      setQuantities({ ...quantities, [category]: 1 });
    } else {
      alert('Not enough coins');
    }
  };

  return (
    <div className="shop-container">
      <h1 className="shop-heading">Shop</h1>
      <div className="balances">
        <div className="balance-item">
          <Image src={food} alt="Food" width={24} height={24} className="balance-image" />
          <span>{balances.food}</span>
        </div>
        <div className="balance-item">
          <Image src={fertilizer} alt="Fertilizer" width={24} height={24} className="balance-image" />
          <span>{balances.fertilizer}</span>
        </div>
        <div className="balance-item">
          <Image src={oil} alt="Oil" width={24} height={24} className="balance-image" />
          <span>{balances.oil}</span>
        </div>
        <div className="balance-item">
          <GiTwoCoins size={24} className="balance-icon" />
          <span>{balances.coins}</span>
        </div>
      </div>
      <div className="items-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`card ${item.glowClass} inner-shadow`}
          >
            <div className="card-content">
              <div className="image-container">
                <Image 
                  src={item.product.image} 
                  alt={item.product.name} 
                  layout="fixed" 
                  width={100} 
                  height={100} 
                  className="product-image" 
                />
              </div>
              <div className="divider"></div>
              <div className="card-details">
                <h2 className="card-title">{item.category}</h2>
                <p className="card-description">{item.product.details}</p>
                <div className="action-controls">
                  <div className="quantity-controls">
                    <button className="quantity-btn decrement-btn" onClick={() => decreaseQuantity(item.category.toLowerCase())}>-</button>
                    <span className="quantity">{quantities[item.category.toLowerCase()]}</span>
                    <button className="quantity-btn increment-btn" onClick={() => increaseQuantity(item.category.toLowerCase())}>+</button>
                  </div>
                  <button
                    className="button-price"
                    onClick={() => purchaseItem(item.category.toLowerCase())}
                  >
                    <GiTwoCoins className="mr-1" /> {products[item.category.toLowerCase()].price * quantities[item.category.toLowerCase()]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-space"></div>
    </div>
  );
};

export default Shop;
