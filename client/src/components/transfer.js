import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDoDisturb } from "react-icons/md";
import "../styles/transfer.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Transfer = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [amount, setAmount] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [receiverInfo, setReceiverInfo] = useState({});
  const [receiverDepositBalance, setReceiverDepositBalance] = useState(null);

  const validField = <IoMdCheckmarkCircle className="valid" />;
  const invalidField = <IoIosCloseCircle className="invalid" />;
  const invalidUsername = <MdDoDisturb className="nodisturb" />;

  const navigate = useNavigate();

  const getReceiverInfo = async () => {
    try {
      const res = await axios.get(
        `${goldwinAPI}/api/user/${username}/receiver`
      );

      if (res.data) {
        setReceiverInfo(res.data);
        setReceiverDepositBalance(res.data.depositBalance);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };

    const config = {
      headers: headers,
    };
    try {
      const res = await axios.post(
        `${goldwinAPI}/api/transfer/${userData.SESSID}/transfer`,
        {
          transferedAmount: amount,
        },
        config
      );

      if (res.data) {
        return toast.success("You transfered successfully.", {
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
      return toast.error("Something went wrong!", {
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

  const handleReceiver = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };

    const config = {
      headers: headers,
    };
    try {
      return await axios.post(
        `${goldwinAPI}/api/receiver/${receiverInfo._id}/receiver`,
        {
          receivedAmount: amount,
        },
        config
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDepositBalance = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };

    const config = {
      headers: headers,
    };
    try {
      return await axios.patch(
        `${goldwinAPI}/api/user/${userData.SESSID}/new-balance`,
        {
          depositBalance: userInfo.depositBalance - amount,
        },
        config
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReceive = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };

    const config = {
      headers: headers,
    };

    try {
      return await axios.patch(
        `${goldwinAPI}/api/user/${receiverInfo._id}/receive`,
        {
          depositBalance: receiverDepositBalance + amount,
        },
        config
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const res = await axios.post(`${goldwinAPI}/api/user/check-username`, {
          userName: username,
        });

        if (res.status === 200) {
          setUsernameValidation(true);
        } else {
          setUsernameValidation(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkUsername();
  }, [username]);

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
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {userData !== null ? (
        <div className="transfer_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <form
            onSubmit={(e) => {
              handleTransfer(e);
              handleReceiver(e);
              handleDepositBalance(e);
              handleReceive(e);
            }}
            className="transfer"
          >
            <h3>Transfer funds</h3>

            <input
              type="text"
              name="username"
              required
              placeholder="Enter username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              onBlur={getReceiverInfo}
            />

            <span className="checkstatus">
              {userInfo.username !== username &&
                usernameValidation === true &&
                username.length > 0 && (
                  <small className="available">
                    {validField} Username available.
                  </small>
                )}
              {userInfo.username === username && username.length > 0 && (
                <small className="taken">
                  {invalidUsername} You can't send to yourself.
                </small>
              )}
              {usernameValidation === false && username.length > 0 && (
                <small className="taken">
                  {invalidField} Username not available.
                </small>
              )}
            </span>

            <input
              type="number"
              name="amount"
              required
              placeholder="Enter amount"
              autoComplete="off"
              onChange={(e) => setAmount(+e.target.value)}
            />

            {userInfo.depositBalance !== undefined &&
            userInfo.depositBalance >= amount ? (
              <div>
                <small>Deposit balance: {userInfo.depositBalance}</small>
                {amount !== null && (
                  <small>
                    Remaing balance: {userInfo.depositBalance - amount}
                  </small>
                )}
              </div>
            ) : (
              ""
            )}

            {userInfo.depositBalance < amount && (
              <small className="nobalance">Insufficient balance!</small>
            )}

            <button
              disabled={
                usernameValidation === false ||
                userInfo.username === username ||
                userInfo.depositBalance < amount
                  ? true
                  : false
              }
            >
              Transfer
            </button>
          </form>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
