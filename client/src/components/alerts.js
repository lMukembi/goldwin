import React, { useEffect, useState } from "react";
import "../styles/alerts.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import axios from "axios";
import { Login } from "./login";
import { MdClose } from "react-icons/md";

const goldwinAPI = "http://46.202.173.77:8000";

export const LoginAlert = ({ close }) => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const userID = userData.SESSID;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/user-data`
        );
        if (res) {
          setUserInfo(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [userID]);
  return (
    <>
      {userData ? (
        <div className="login_alert">
          <div>
            <div>Info</div>
            <div>Login success!</div>
            <div>
              Welcome back, <span>{userInfo.username}</span>.
            </div>
          </div>
          <div>
            <MdClose className="closealert" onClick={() => close()} />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export const LogoutAlert = ({ close }) => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const userID = userData.SESSID;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/user-data`
        );
        if (res) {
          setUserInfo(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [userID]);
  return (
    <>
      {userData ? (
        <div className="logout_alert">
          <div>
            <IoIosCheckmarkCircleOutline className="logouticon" />
          </div>
          <p>Logout success!</p>
          <div>Thank you, {userInfo.username}.</div>
          <button onClick={() => close()}>OK</button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
