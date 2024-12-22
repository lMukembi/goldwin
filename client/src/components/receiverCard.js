import React from "react";
import "../styles/notifications.css";
import { IoArrowUp } from "react-icons/io5";

export const ReceiverCard = ({ receiverMessage }) => {
  return (
    <div className="notification_card_details">
      <div className="notification_card_top">
        <IoArrowUp className="notification_card_icon" />
        <div className="notification_card_info">
          <div className="notification_card_text">You received</div>
          <div className="notification_card_time">
            {new Date(receiverMessage.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="notification_card_amt">
            {receiverMessage.receivedAmount} KES
          </div>
          <div className="notification_card_time confirm">Confirmed</div>
        </div>
      </div>
    </div>
  );
};
