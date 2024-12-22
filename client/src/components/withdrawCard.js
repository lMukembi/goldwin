import React from "react";
import "../styles/notifications.css";
import { CiReceipt } from "react-icons/ci";

export const WithdrawCard = ({ withdrawalMessage }) => {
  return (
    <div className="notification_card_details">
      <div className="notification_card_top">
        <CiReceipt className="notification_card_icon" />
        <div>
          <div className="notification_card_text">You withdrawn</div>
          <div className="notification_card_time">
            {new Date(withdrawalMessage.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="notification_card_amt">
            {withdrawalMessage.amount} KES
          </div>
          <div className="notification_card_time confirm">
            {withdrawalMessage.status}
          </div>
        </div>
      </div>
    </div>
  );
};
