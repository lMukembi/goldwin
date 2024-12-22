import React, { Fragment, useEffect, useState } from "react";
import "../styles/notifications.css";
import axios from "axios";
import { TransactionCard } from "./transactionCard";

const goldwinAPI = "http://localhost:8000";

export const TransactionNotifications = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const userID = userData.SESSID;

  const [transactionMessages, setTransactionMessages] = useState([]);
  const [transactionMessagesID, setTransactionMessagesID] = useState(null);

  useEffect(() => {
    const getTransactionMessages = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/sasaPay/${userID}/transaction-messages`
        );
        if (res.data) {
          setTransactionMessages(res.data);
          if (res.data[0] !== undefined) {
            setTransactionMessagesID(res.data[0].userID);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getTransactionMessages();
  }, [userID]);

  return (
    <div>
      {transactionMessages.length > 0 && transactionMessagesID === userID ? (
        <>
          {transactionMessages.length > 0 &&
            transactionMessagesID === userID &&
            transactionMessages.map((transactionMessage, index) => {
              return (
                <Fragment key={index + "." + transactionMessage.userID}>
                  <TransactionCard transactionMessage={transactionMessage} />
                </Fragment>
              );
            })}
        </>
      ) : (
        <small>Your transactions will appear here!</small>
      )}
    </div>
  );
};
