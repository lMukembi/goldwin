import React, { useEffect, useState } from "react";
import "../styles/loans.css";
import "../styles/dropdown.css";
import { Header } from "./header";
import { Login } from "./login";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = "http://localhost:8000";

export const Loans = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [value, setValue] = useState("");
  const [amount, setAmount] = useState(null);
  const [userIncome, setUserIncome] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const navigate = useNavigate();

  const handleSelect = (event) => {
    setValue(+event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(+event.target.value);
  };

  const handleSubmit = async (e) => {
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
      const insufficientBalance = userBalance < amount;

      if (insufficientBalance) {
        return alert("You have insuffient balance.");
      } else {
        const res = await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/loan`,
          {
            incomeSum: userIncome + amount,
          },
          config
        );

        if (res.data) {
          alert("Submit success!");
          if (res.data) {
            return navigate("/");
          }
        }
      }
    } catch (error) {
      if (error) {
        return navigate("/loan");
      }
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
          setUserIncome(+res.data.incomeSum);
          setUserBalance(res.data.balance);
        }
      } catch (err) {
        console.log(err);
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
        <div className="capital_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="capital"
          >
            <h3>Request Loan</h3>

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

            <div className="capital_profit">
              Total: {value * amount * 0.3 + amount} KES
              <div>Interest: {value * amount * 0.3} KES</div>
            </div>

            <button>Get Loan</button>
          </form>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
