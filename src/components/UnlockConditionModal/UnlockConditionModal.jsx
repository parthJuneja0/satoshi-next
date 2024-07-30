import React from 'react';
import './UnlockConditionModal.css';

const UnlockConditionModal = ({ show, onClose, condition }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <span className="title">Unlock Condition</span>
          <button className="close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{condition}</p>
        </div>
        <div className="modal-footer">
          <button className="close" onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default UnlockConditionModal;
