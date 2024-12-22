import React from "react";
import "../styles/notifications.css";
import { IoArrowDown } from "react-icons/io5";

export const TransactionCard = ({ transactionMessage }) => {
  return (
    <>
      {transactionMessage !== undefined && (
        <div className="notification_card_details">
          <div className="notification_card_top">
            <IoArrowDown className="notification_card_icon transaction_card_icon" />
            <div className="notification_card_info">
              {transactionMessage.mpesaTransactionID} Confirmed. You deposited
              successfully.
            </div>
          </div>
          <div>
            <div className="notification_card_amt">
              {transactionMessage.amount}.00 KES
            </div>
            <div className="notification_card_time confirm">
              {new Date(transactionMessage.createdAt).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
