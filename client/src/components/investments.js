import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/invest.css";
import "../styles/dropdown.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = process.env.SERVER_URL;

export const Investments = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [userInvestmentsBalance, setUserInvestmentsBalance] = useState(null);
  const [userDepositBalance, setUserDepositBalance] = useState(null);

  const navigate = useNavigate();

  const newInvestments = value * amount * 0.3 + amount;

  const handleSelect = (event) => {
    setValue(+event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(+event.target.value);
  };

  const handleSubmitInvestments = async (e) => {
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
      const insufficientBalance = userDepositBalance < amount;

      if (insufficientBalance) {
        return toast.error("You have insuffient balance.", {
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
      } else {
        const res = await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/investments`,
          {
            investmentsBalance: userInvestmentsBalance + newInvestments,
          },
          config
        );

        if (res.data) {
          toast.success("Your investment approved successfully.", {
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
      const sufficientBalance = userDepositBalance > amount;

      if (sufficientBalance) {
        await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/new-balance`,
          {
            depositBalance: userDepositBalance - amount,
          },
          config
        );
      }
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
        if (res.data) {
          setUserInfo(res.data);
          setUserInvestmentsBalance(+res.data.investmentsBalance);
          setUserDepositBalance(res.data.depositBalance);
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
        <div className="invests_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <form
            onSubmit={(e) => {
              handleSubmitInvestments(e);
              handleDepositBalance(e);
            }}
            className="invests"
          >
            <h3>Apply investment</h3>

            <div className="dropdown">
              <select onChange={handleSelect}>
                <option value="0">Choose Period</option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
              </select>
            </div>

            <input
              type="number"
              name="amount"
              required
              placeholder="Enter amount"
              onChange={handleAmount}
            />

            {userInfo.depositBalance !== undefined &&
            userInfo.depositBalance >= amount ? (
              <div className="invests_info">
                <small>Deposit balance: {userInfo.depositBalance}</small>
                {amount !== null && (
                  <small>
                    Remaing balance: {userInfo.depositBalance - amount}
                  </small>
                )}{" "}
              </div>
            ) : (
              ""
            )}

            {userInfo.depositBalance < amount && (
              <small>Insufficient balance!</small>
            )}

            <div className="invest_profit">
              {userInfo.depositBalance >= amount &&
                `Expected payout: ${value * amount * 0.3 + amount} KES`}
            </div>

            <button disabled={userInfo.depositBalance < amount ? true : false}>
              Invest Now
            </button>
          </form>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
