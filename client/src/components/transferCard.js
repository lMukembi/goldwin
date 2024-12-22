import React from "react";
import "../styles/notifications.css";
import { VscSend } from "react-icons/vsc";

export const TransferCard = ({ transferMessage }) => {
  return (
    <div className="notification_card_details">
      <div className="notification_card_top">
        <VscSend className="notification_card_icon" />
        <div>
          <div className="notification_card_text">You transfered</div>
          <div className="notification_card_time">
            {new Date(transferMessage.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="notification_card_amt">
            {transferMessage.transferedAmount} KES
          </div>
          <div className="notification_card_time confirm">Confirmed</div>
        </div>
      </div>
    </div>
  );
};
