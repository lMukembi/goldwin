import React, { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrLink } from "react-icons/gr";
import axios from "axios";
import { redirect } from "react-router-dom";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Referal = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const userID = userData.SESSID;

  const [userInfo, setUserInfo] = useState({});
  const [userPackageExpireAt, setUserPackageExpireAt] = useState(null);

  const referalLink = `https://goldwinadverts.com/SrBcNEtXZJlucFR/${userInfo.username}`;

  const handleCopy = () => {
    if (userPackageExpireAt === null && userInfo.referralID !== "ceo") {
      return toast.warn(
        `Hi ${userInfo.username}, kindly purchase one of our available packages and unlock access today.`,
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
    navigator.clipboard.writeText(referalLink);
    return toast.success("Link copied!", {
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
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/user-data`
        );
        if (res.data) {
          setUserInfo(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [userID]);

  useEffect(() => {
    const getPackageExpireAt = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/package-expires`
        );

        if (res) {
          setUserPackageExpireAt(res.data.expireAt);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getPackageExpireAt();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="referal">
      <div className="referaltop">
        <GrLink />
        Referal link
      </div>

      <div className="referallink">
        <input value={referalLink} readOnly />

        <button onClick={handleCopy}>
          <MdOutlineContentCopy />
          Copy link
        </button>
      </div>
    </div>
  );
};
