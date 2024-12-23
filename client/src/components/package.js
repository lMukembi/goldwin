import React, { useEffect, useState } from "react";
import Giveaway from "../assets/images/Giveaway.png";
import Offer from "../assets/images/Offer.png";
import Big from "../assets/images/Big.png";
import Off from "../assets/images/Off.png";
import Limited from "../assets/images/Limited.png";
import Merry from "../assets/images/Merry.png";
import Girl from "../assets/images/Girl.png";
import Advertise from "../assets/images/Advertise.png";
import Black from "../assets/images/Black.png";
import Christmas from "../assets/images/Christmas.png";
import Hire from "../assets/images/Hire.png";
import Marketing from "../assets/images/Marketing.png";
import Money from "../assets/images/Money.png";
import Manager from "../assets/images/Manager.png";
import Cash from "../assets/images/Cash.png";
import Santa from "../assets/images/Santa.png";
import Open from "../assets/images/Open.png";
import "../styles/packages.css";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import { Login } from "./login";
import { PiCertificateLight } from "react-icons/pi";
import { IoBagHandleOutline } from "react-icons/io5";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Package = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [userInfo, setUserInfo] = useState({});
  const [index, setIndex] = useState(1);

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

  const getImage = (index) => {
    switch (index) {
      case 1:
        return Offer;

      case 2:
        return Giveaway;

      case 3:
        return Off;

      case 4:
        return Limited;

      case 5:
        return Big;

      case 6:
        return Merry;

      case 7:
        return Girl;

      case 8:
        return Advertise;

      case 9:
        return Black;

      case 10:
        return Christmas;

      case 11:
        return Hire;

      case 12:
        return Marketing;

      case 13:
        return Money;

      case 14:
        return Manager;

      case 15:
        return Cash;

      case 16:
        return Santa;

      case 17:
        return Open;

      default:
        break;
    }
  };

  const numberOfImages = 17;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (index === numberOfImages ? 1 : prevIndex + 1));
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  const today = new Date();
  const day = today.getDay();
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      {userData !== null ? (
        <div className="package">
          <div className="servicepackage">
            <p>My package</p>
            <div className="membership">
              {userInfo.referralID !== "ceo" && (
                <>
                  {userInfo.servicePackage ? (
                    <>
                      <PiCertificateLight className="membershipbadge" />
                      <>{userInfo.servicePackage} package</>
                    </>
                  ) : (
                    <>
                      <IoBagHandleOutline className="nomembershipbadge" />
                      <>No package</>
                    </>
                  )}
                </>
              )}
              {userInfo.referralID === "ceo" && (
                <>
                  <PiCertificateLight className="membershipbadge" />
                  <>Noble package</>
                </>
              )}
            </div>
          </div>
          <div className="giveaway">
            <h4>{dayList[day]}'s Giveaway🎄.</h4>

            <img src={getImage(index)} alt="Goldwin Adverts giveaway" />
          </div>

          <Link to="/package">
            <div className="upgradebtn">Upgrade Now</div>
          </Link>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
