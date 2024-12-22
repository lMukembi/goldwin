import React, { Fragment, useEffect, useState } from "react";
import "../styles/notifications.css";
import axios from "axios";
import { ReceiverCard } from "./receiverCard";

const goldwinAPI = "http://localhost:8000";

export const ReceiverNotifications = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const userID = userData.SESSID;

  const [receiverMessages, setReceiverMessages] = useState([]);
  const [receiverMessagesID, setReceiverMessagesID] = useState(null);

  useEffect(() => {
    const getReceiverMessages = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/receiver/${userID}/receiver-messages`
        );
        if (res.data) {
          setReceiverMessages(res.data);
          if (res.data[0] !== undefined) {
            setReceiverMessagesID(res.data[0].userID);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getReceiverMessages();
  }, [userID]);

  return (
    <div>
      {receiverMessages.length > 0 && receiverMessagesID === userID ? (
        <>
          {receiverMessages.length > 0 &&
            receiverMessagesID === userID &&
            receiverMessages.map((receiverMessage, index) => {
              return (
                <Fragment key={index + "." + receiverMessage._id}>
                  <ReceiverCard receiverMessage={receiverMessage} />
                </Fragment>
              );
            })}
        </>
      ) : (
        <small>Your messages will appear here!</small>
      )}
    </div>
  );
};
