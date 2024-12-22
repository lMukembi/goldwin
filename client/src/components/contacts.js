import React, { useEffect, useState } from "react";
import "../styles/contacts.css";
import { Header } from "./header";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "./menu";
import { Login } from "./login";

const goldwinAPI = process.env.SERVER_URL;

export const Contact = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");

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
      const res = await axios.post(
        `${goldwinAPI}/api/user/client-support`,
        {
          message,
          email: userInfo.email,
        },
        config
      );

      if (res.data.data) {
        return toast.success("Email sent, Wait for reply.", {
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

  return (
    <>
      {userData !== null ? (
        <div className="contact_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />
          <h3>Contact us</h3>
          <div className="contact">
            <textarea
              rows="8"
              placeholder="Leave a message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e)}>Send Mail</button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
