import React, { Fragment, useEffect, useState } from "react";
import { MdOutlineReceiptLong } from "react-icons/md";
import { Login } from "./login";
import axios from "axios";
import { TransactionCard } from "./transactionCard";
import { redirect } from "react-router-dom";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Transactions = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [transactionMessages, setTransactionMessages] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;
        const res = await axios.get(
          `${goldwinAPI}/api/sasaPay/${userID}/transaction-messages`
        );
        if (res.data) {
          setTransactionMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTransactions();
  }, []);

  return (
    <>
      {userData !== null ? (
        <div className="transactions">
          <div className="transactionstop">
            <MdOutlineReceiptLong />
            Transactions
          </div>

          <div>
            {transactionMessages.length > 0 ? (
              <>
                {transactionMessages.length > 0 &&
                  transactionMessages.map((transactionMessage, index) => {
                    return (
                      <Fragment key={index + "." + transactionMessage._id}>
                        <TransactionCard
                          transactionMessage={transactionMessage}
                        />
                      </Fragment>
                    );
                  })}
              </>
            ) : (
              <small>Your recent transactions will appear here!</small>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
