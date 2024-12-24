import axios from "axios";
import React, { useEffect, useState } from "react";
import { Login } from "./login";
import { redirect } from "react-router-dom";
import { BsPersonCheck } from "react-icons/bs";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Welcome = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!userData.SESSID) {
          return redirect("/login");
        }
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userData.SESSID}/user-data`
        );
        if (res) {
          setUserInfo(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [userData.SESSID]);

  return (
    <>
      {userData !== null ? (
        <div className="welcome">
          <div>
            Welcome back, <span>{userInfo.username}</span>👋
          </div>
          {userInfo.referralID === "ceo" && (
            <div className="verified">
              <BsPersonCheck />
              <span>Verified</span>
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
