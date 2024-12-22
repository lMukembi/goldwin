import React from "react";
import "../styles/notifications.css";

export const WhatsappCard = ({ whatsappRecord }) => {
  return (
    <div className="notification_card_details">
      <div className="notification_card_top">
        <img
          src={whatsappRecord.imageName}
          alt=""
          className="notification_card_icon"
        />
        <div className="notification_card_info">
          <div className="notification_card_text">
            {whatsappRecord.views} views
          </div>
          <div className="notification_card_time">
            {new Date(whatsappRecord.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="notification_card_amt">
            {whatsappRecord.whatsappBalance} KES
          </div>
          <div className="notification_card_time confirm">Confirmed</div>
        </div>
      </div>
    </div>
  );
};
