import React, { useEffect, useState } from "react";
import "../styles/notFound.css";
import { Header } from "./header";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

const goldwinAPI = "http://localhost:8000";

export const NotFound = () => {
  const [userInfo, setUserInfo] = useState({});

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
        console.log(err);
      }
    };

    getUserData();
  }, []);
  return (
    <div className="not_found_wrapper">
      <Header />
      <div className="not_found">
        <h1>Oops!</h1>
        <h3>404 Not Found</h3>
        <p>Sorry, this page isn't available.</p>
        <div className="not_found_btn">
          {userInfo && <Link to="/">Go to Homepage</Link>}
          <Link to="/contact-us">Contact Support</Link>
        </div>
      </div>
    </div>
  );
};
