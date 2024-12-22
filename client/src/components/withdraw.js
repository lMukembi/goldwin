import React, { Fragment, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { MdOutlineReceiptLong } from "react-icons/md";
import MPesa from "../assets/images/MPesa.png";
import { WithdrawCard } from "./withdrawCard";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/withdraw.css";
import "../styles/dropdown.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = process.env.SERVER_URL;

export const Withdraw = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const navigate = useNavigate();

  const adminUsername = "ceo";

  const [userInfo, setUserInfo] = useState({});
  const [withdrawableBalance, setWithdrawableBalance] = useState(null);
  const [agentWithdrawnBalance, setAgentWithdrawnBalance] = useState(null);
  const [whatsappWithdrawnBalance, setWhatsappWithdrawnBalance] =
    useState(null);
  const [userToken, setUserToken] = useState(null);
  const [spinningBalance, setSpinningBalance] = useState(null);
  const [academicBalance, setAcademicBalance] = useState(null);
  const [investmentsBalance, setInvestmentsBalance] = useState(null);
  const [whatsappBalance, setWhatsappBalance] = useState(null);
  const [withdrawalMessages, setWithdrawalMessages] = useState([]);
  const [adminBalance, setAdminBalance] = useState(null);
  const [amount, setAmount] = useState(null);
  const [token, setToken] = useState("");
  const [value, setValue] = useState(0);

  let senderPhone = "";

  if (userInfo.phone !== undefined) {
    senderPhone = userInfo.phone.substring(3);
  }

  const handleSelect = (event) => {
    setValue(+event.target.value);
  };

  const getUserToken = async () => {
    if (userData === null) {
      return navigate("/login");
    }

    try {
      const res = await axios.get(
        `${goldwinAPI}/api/user/${userData.SESSID}/token-expires`
      );

      if (res.data) {
        setUserToken(res.data.secret);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
    if (!userInfoData) {
      return redirect("/login");
    }
    const userID = userInfoData.SESSID;

    let afterDeduction = 0.95 * amount;

    try {
      if (userInfo.referralID !== "ceo" || value !== withdrawableBalance) {
        const res = await axios.post(
          `${goldwinAPI}/api/withdraw/${userID}/new-withdrawal`,
          {
            amount,
            token,
          }
        );
        if (res.status === 200) {
          return toast.success(
            "Congratulations! Premium code verified. Your withdrawal has been processed successfully.",
            {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              icon: false,
            }
          );
        }
      } else {
        if (userInfo.referralID === "ceo" && value === withdrawableBalance) {
          const res = await axios.post(
            `${goldwinAPI}/api/withdraw/${userID}/new-withdrawal`,
            {
              amount: afterDeduction,
              phone: senderPhone,
              token,
            }
          );
          if (res.status === 200) {
            return toast.success(
              "Congratulations! Premium code verified. Your withdrawal has been processed successfully.",
              {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                icon: false,
              }
            );
          }
        }
      }
    } catch (error) {
      return toast.error("Something went wrong.", {
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

  const handleAgentWithdrawnBalance = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    try {
      return await axios.patch(
        `${goldwinAPI}/api/user/${userData.SESSID}/agent-balance`,
        {
          agentWithdrawnBalance: agentWithdrawnBalance + amount,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleWithdrawableBalance = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    try {
      const res = await axios.patch(
        `${goldwinAPI}/api/user/${userData.SESSID}/balance`,
        {
          withdrawableBalance: withdrawableBalance - amount,
        }
      );
      if (res.status) {
        return toast.success(
          `Hi ${userInfo.username}, you've successfully withdrawn Agent Funds worth KES ${amount}.00. Please confirm your M-Pesa Account. Happy profits!`,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            icon: false,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const newUserWhatsappDetails = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    try {
      const res = await axios.patch(
        `${goldwinAPI}/api/user/${userData.SESSID}/whatsapp-details`,
        {
          whatsappBalance: whatsappBalance - amount,
        }
      );
      if (res.data) {
        return toast.success(
          `Hi ${userInfo.username}, you've successfully withdrawn Wallet Funds worth KES ${amount}.00. Please confirm your M-Pesa Account. Happy profits!`,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            icon: false,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleWhatsappWithdrawnBalance = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    try {
      return await axios.patch(
        `${goldwinAPI}/api/user/${userData.SESSID}/wa-balance`,
        {
          whatsappWithdrawnBalance: whatsappWithdrawnBalance + amount,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInvestments = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    try {
      const res = await axios.patch(
        `${goldwinAPI}/api/user/${userData.SESSID}/investments`,
        {
          investmentsBalance: userInfo.investmentsBalance - amount,
        }
      );

      if (res.data) {
        return toast.success(
          `Hi ${userInfo.username}, you've successfully withdrawn Investments Funds worth KES ${amount}.00. Please confirm your M-Pesa Account. Happy profits!`,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            icon: false,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdminBalance = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };
    const config = {
      headers: headers,
    };

    let adminCommission = 0.05 * amount;

    try {
      return await axios.patch(
        `${goldwinAPI}/api/admin/${adminUsername}/new-balance`,
        {
          adminBalance: adminBalance + adminCommission,
        },
        config
      );
    } catch (error) {
      console.log(error.message);
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
          setWithdrawableBalance(res.data.withdrawableBalance);
          setAgentWithdrawnBalance(res.data.agentWithdrawnBalance);
          setWhatsappWithdrawnBalance(res.data.whatsappWithdrawnBalance);
          setInvestmentsBalance(res.data.investmentsBalance);
          setAcademicBalance(res.data.academicBalance);
          setSpinningBalance(res.data.spinningBalance);
          setWhatsappBalance(res.data.whatsappBalance);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getWithdrawals = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;

        const res = await axios.get(
          `${goldwinAPI}/api/withdraw/${userID}/withdraw-records`
        );

        if (res.data) {
          setWithdrawalMessages(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getWithdrawals();
  }, []);

  useEffect(() => {
    const getAdminBalance = async () => {
      try {
        const res = await axios.post(`${goldwinAPI}/api/admin/username`, {
          username: adminUsername,
        });

        if (res.data.adminData) {
          setAdminBalance(+res.data.adminData.adminBalance);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAdminBalance();
  }, [adminUsername]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {userData !== null ? (
        <div className="withdraw_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <div className="withdraw_form">
            <form className="withdraw">
              <h3>Withdraw funds</h3>

              {userInfo.phone !== undefined ? (
                <small>
                  <img src={MPesa} alt="Goldwin Adverts MPesa logo" />{" "}
                  {`0${senderPhone}`}
                </small>
              ) : (
                ""
              )}

              <div className="dropdown">
                <select onChange={(e) => handleSelect(e)}>
                  <option>Choose Account</option>
                  <option value={withdrawableBalance}>
                    Agent Balance{" "}
                    {withdrawableBalance !== null ? withdrawableBalance : 0}
                    .00 KES
                  </option>
                  <option value={whatsappBalance}>
                    Wallet Balance{" "}
                    {whatsappBalance !== null ? whatsappBalance : 0}
                    .00 KES
                  </option>
                  <option value={spinningBalance}>
                    Spinning Balance{" "}
                    {spinningBalance !== null ? spinningBalance : 0}.00 KES
                  </option>
                  <option value={investmentsBalance}>
                    Investment Balance{" "}
                    {investmentsBalance !== null ? investmentsBalance : 0}.00
                    KES
                  </option>
                  <option value={academicBalance}>
                    Academic Balance{" "}
                    {academicBalance !== null ? academicBalance : 0}.00 KES
                  </option>
                </select>
              </div>

              <input
                type="number"
                name="amount"
                required
                placeholder="Enter amount"
                autoComplete="off"
                onChange={(e) => setAmount(+e.target.value)}
              />

              {value !== 0 && value >= amount && amount !== null ? (
                <small>Remaining balance: {value - amount}</small>
              ) : (
                ""
              )}

              {value < amount && (
                <small className="nobalance">Insufficient balance!</small>
              )}

              <input
                type="text"
                name="token"
                required
                placeholder="Enter premium code"
                autoComplete="off"
                maxLength={6}
                onChange={(e) => setToken(e.target.value)}
                onBlur={getUserToken}
              />

              {value === 0 ? (
                <>
                  <button
                    disabled={
                      (userToken === null && token.length !== 6) ||
                      value < amount
                        ? true
                        : false
                    }
                  >
                    Withdraw Now
                  </button>
                </>
              ) : (
                <>
                  {value === investmentsBalance && (
                    <button
                      onClick={(e) => {
                        handleWithdraw(e);
                        handleInvestments(e);
                      }}
                      disabled={
                        (userToken === null && token.length !== 6) ||
                        value < amount
                          ? true
                          : false
                      }
                    >
                      Withdraw Now
                    </button>
                  )}
                  {value === withdrawableBalance && (
                    <button
                      onClick={(e) => {
                        handleWithdraw(e);
                        handleWithdrawableBalance(e);
                        handleAgentWithdrawnBalance(e);
                        handleAdminBalance(e);
                      }}
                      disabled={
                        (userToken === null && token.length !== 6) ||
                        value < amount
                          ? true
                          : false
                      }
                    >
                      Withdraw Now
                    </button>
                  )}

                  {value === whatsappBalance && (
                    <button
                      onClick={(e) => {
                        handleWithdraw(e);
                        newUserWhatsappDetails(e);
                        handleWhatsappWithdrawnBalance(e);
                      }}
                      disabled={
                        (userToken === null && token.length !== 6) ||
                        value < amount
                          ? true
                          : false
                      }
                    >
                      Withdraw Now
                    </button>
                  )}
                </>
              )}
            </form>
          </div>
          <div className="withdraw_records">
            <p className="withdraw_records_top">
              <MdOutlineReceiptLong className="withdraw_records_icon" />
              Recent history
            </p>

            <div className="withdraw_records_items">
              {withdrawalMessages !== null && withdrawalMessages.length > 0 ? (
                <>
                  {withdrawalMessages.length > 0 &&
                    withdrawalMessages.map((withdrawalMessage, index) => {
                      return (
                        <Fragment key={index + "." + withdrawalMessage._id}>
                          <WithdrawCard withdrawalMessage={withdrawalMessage} />
                        </Fragment>
                      );
                    })}
                </>
              ) : (
                <small>Your withdrawal history will appear here!</small>
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
