import React, { Fragment, useEffect, useState } from "react";
import "../styles/notifications.css";
import axios from "axios";
import { TransferCard } from "./transferCard";

const goldwinAPI = process.env.SERVER_URL;

export const TransferNotifications = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const userID = userData.SESSID;

  const [transferMessages, setTransferMessages] = useState([]);
  const [transferMessagesID, setTransferMessagesID] = useState(null);

  useEffect(() => {
    const getTransferMessages = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/transfer/${userID}/transfer-messages`
        );
        if (res.data) {
          setTransferMessages(res.data);
          if (res.data[0] !== undefined) {
            setTransferMessagesID(res.data[0].userID);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getTransferMessages();
  }, [userID]);

  return (
    <div>
      {transferMessages.length > 0 && transferMessagesID === userID ? (
        <>
          {transferMessages.length > 0 &&
            transferMessagesID === userID &&
            transferMessages.map((transferMessage, index) => {
              return (
                <Fragment key={index + "." + transferMessage._id}>
                  <TransferCard transferMessage={transferMessage} />
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
