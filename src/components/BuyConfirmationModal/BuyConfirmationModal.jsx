import React from "react";
import "./BuyConfirmationModal.css";
const BuyConfirmationModal = ({ show, onClose, onConfirm, card }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Purchase</h2>
        <p>
          Are you sure you want to buy the <strong>{card.title}</strong> card
          for <strong>{card.price} Coins</strong>?
        </p>
        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyConfirmationModal;
