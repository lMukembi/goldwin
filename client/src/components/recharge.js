import React, { Fragment, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { TransactionCard } from "./transactionCard";
import { MdOutlineReceiptLong } from "react-icons/md";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MPesa from "../assets/images/MPesa.png";
import "../styles/recharge.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Recharge = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [userInfo, setUserInfo] = useState({});
  const [amount, setAmount] = useState(null);
  const [transactionMessages, setTransactionMessages] = useState([]);

  let senderPhone = "";

  if (userInfo.phone) {
    senderPhone = userInfo.phone.substring(3);
  }

  const handleRecharge = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${goldwinAPI}/api/sasaPay/deposit`, {
        amount,
        phone: userInfo.phone,
      });

      if (res.status === 200) {
        toast.success("Message sent, Wait for M-Pesa to reply.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      return toast.error("Request failed!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;

        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/user-data`
        );
        if (res) {
          setUserInfo(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserData();
  }, []);

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
        console.log(err.message);
      }
    };

    getTransactions();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {userData !== null ? (
        <div className="recharge_wrapper">
          {window.innerWidth > 768 && <Menu />}
          <Header />

          <form
            className="recharge"
            onSubmit={(e) => {
              handleRecharge(e);
            }}
          >
            <h3>Account recharge</h3>

            <input
              type="number"
              name="amount"
              required
              placeholder="Enter amount"
              autoComplete="off"
              onChange={(e) => setAmount(+e.target.value)}
            />
            {userInfo.phone !== undefined ||
            userInfo.depositBalance !== undefined ? (
              <div className="rechargeinfo">
                {userInfo.phone !== undefined ? (
                  <small>
                    <img src={MPesa} alt="Goldwin Adverts MPesa logo" />{" "}
                    {`0${senderPhone}`}
                  </small>
                ) : (
                  ""
                )}

                <small>New balance: {userInfo.depositBalance + amount}</small>
              </div>
            ) : (
              ""
            )}

            <button>Recharge Now</button>
          </form>
          <div className="recharge_messages">
            <p className="recharge_messages_top">
              <MdOutlineReceiptLong />
              Transactions
            </p>

            <div className="recharge_messages_container">
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
                <small>Your transactions will appear here!</small>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
