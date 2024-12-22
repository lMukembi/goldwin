import React, { useEffect, useState } from "react";
import "../styles/notifications.css";
import { Header } from "./header";
import { Login } from "./login";
import { WhatsappNotifications } from "./whatsappNotifications";
import { TransferNotifications } from "./transferNotifications";
import { ReceiverNotifications } from "./receiverNotifications";
import { TransactionNotifications } from "./transactionNotifications";
import { Menu } from "./menu";

export const Notifications = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [tab, setTab] = useState("DEPOSIT");

  const activeTabStyle = {
    borderBottom: "2px solid green",
    color: "green",
    width: "30%",
    textAlign: "center",
    borderRadius: "1px",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {userData !== null ? (
        <div className="notifications">
          {window.innerWidth > 768 && <Menu />}
          <Header />
          <h3>All notifications</h3>
          <div>
            <div className="tab">
              <div
                style={tab === "DEPOSIT" ? activeTabStyle : {}}
                onClick={() => setTab("DEPOSIT")}
              >
                Recharge
              </div>

              <div
                style={tab === "WHATSAPP" ? activeTabStyle : {}}
                onClick={() => setTab("WHATSAPP")}
              >
                Whatsapp
              </div>

              <div
                style={tab === "TRANSFERED" ? activeTabStyle : {}}
                onClick={() => setTab("TRANSFERED")}
              >
                Transfered
              </div>

              <div
                style={tab === "RECEIVED" ? activeTabStyle : {}}
                onClick={() => setTab("RECEIVED")}
              >
                Received
              </div>
            </div>

            <div>
              {tab === "DEPOSIT" && <TransactionNotifications />}
              {tab === "WHATSAPP" && <WhatsappNotifications />}
              {tab === "TRANSFERED" && <TransferNotifications />}
              {tab === "RECEIVED" && <ReceiverNotifications />}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
