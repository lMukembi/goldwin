import axios from "axios";
import {
  DEPOSIT_SUCCESS,
  UPGRADE_SUCCESS,
  WITHDRAW_SUCCESS,
} from "../constants/mpesa";

const goldwinAPI = "http://localhost:8000";

export const upgrade = (packageData) => async (dispatch) => {
  const data = localStorage.getItem("newUser");
  const token = JSON.parse(data);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.data}`,
    //   "Access-Control-Allow-Origin": "https://www.jorjer.com",
  };
  const config = {
    headers: headers,
  };

  try {
    const { data } = await axios.post(
      `${goldwinAPI}/api/mpesa/upgrade`,
      packageData,
      config
    );

    dispatch({ type: UPGRADE_SUCCESS, payload: data });

    if (data) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
    if (error) {
      window.location.href = "./packages";
    }
  }
};

export const deposit = (depositData) => async (dispatch) => {
  const data = localStorage.getItem("newUser");
  const token = JSON.parse(data);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.data}`,
    //   "Access-Control-Allow-Origin": "https://www.jorjer.com",
  };
  const config = {
    headers: headers,
  };

  try {
    const { data } = await axios.post(
      `${goldwinAPI}/api/mpesa/deposit`,
      depositData,
      config
    );

    dispatch({ type: DEPOSIT_SUCCESS, payload: data });

    if (data) {
      alert("Deposit success!");
    }
  } catch (error) {
    console.log(error);
    if (error) {
      window.location.href = "./recharge";
    }
  }
};

export const withdraw = (withdrawData) => async (dispatch) => {
  const data = localStorage.getItem("newUser");
  const token = JSON.parse(data);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.data}`,
    //   "Access-Control-Allow-Origin": "https://www.jorjer.com",
  };
  const config = {
    headers: headers,
  };

  try {
    const { data } = await axios.post(
      `${goldwinAPI}/api/mpesa/withdraw`,
      withdrawData,
      config
    );

    dispatch({ type: WITHDRAW_SUCCESS, payload: data });

    if (data) {
      alert("Withdrawal success!");
    }
  } catch (error) {
    console.log(error);
    if (error) {
      window.location.href = "./withdraw";
    }
  }
};
