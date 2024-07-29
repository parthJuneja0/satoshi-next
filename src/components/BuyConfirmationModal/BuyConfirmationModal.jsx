import React from 'react';
import './BuyConfirmationModal.css';

const BuyConfirmationModal = ({ show, onClose, onConfirm, card }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <span className="title">Confirm Purchase</span>
          <button className="close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to buy <strong>{card.title}</strong> for <strong>{card.price}</strong> coins?</p>
        </div>
        <div className="modal-footer">
          <button className="confirm" onClick={onConfirm}>Confirm</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default BuyConfirmationModal;
