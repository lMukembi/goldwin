import React, { useEffect, useState } from "react";
import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "react-router-dom";
import { Header } from "./header";
import "../styles/settings.css";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Settings = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [userInfo, setUserInfo] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const validField = <IoMdCheckmarkCircle className="icon" />;
  const invalidField = <IoIosCloseCircle className="icon" />;

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

        if (
          (res.data.email && res.data.username && res.data.phone) !== undefined
        ) {
          const Phone = `0${res.data.phone.substring(3)}`;
          setEmail(res.data.email);
          setUsername(res.data.username);
          setPhone(Phone);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserData();
  }, []);

  const checkUsername = async () => {
    try {
      const res = await axios.post(`${goldwinAPI}/api/user/check-username`, {
        userName: username,
      });

      if (!res.data) {
        setUsernameValidation(true);
      } else {
        setUsernameValidation(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkPhone = async () => {
    try {
      const Phone = `254${phone.substring(1)}`;

      const res = await axios.post(`${goldwinAPI}/api/user/check-phone`, {
        phone: Phone,
      });

      if (!res.data) {
        setPhoneValidation(true);
      } else {
        setPhoneValidation(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkEmail = async () => {
    try {
      const validEmail = EMAIL_REGEX.test(email);
      const res = await axios.post(`${goldwinAPI}/api/user/check-email`, {
        email,
      });

      if (!res.data && validEmail) {
        setEmailValidation(true);
      } else {
        setEmailValidation(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSettings = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
    if (!userInfoData) {
      return redirect("/login");
    }
    const userID = userInfoData.SESSID;

    try {
      const res = await axios.put(
        `${goldwinAPI}/api/user/${userID}/settings`,
        {
          phone: `254${phone.substring(1)}`,
          email,
          username,
          password,
        },
        config
      );

      if (res.data) {
        localStorage.setItem(
          "JSUD",
          JSON.stringify({
            SESSID: res.data.result._id,
            UTKN: res.data.tokenID,
          })
        );
        return toast.success("Changes saved successfully.", {
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
      return toast.error("Something went wrong!", {
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

  return (
    <>
      {userData !== null ? (
        <div className="settings_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <div className="settings">
            <h3>Settings</h3>
            <form onSubmit={handleSettings}>
              <input
                type="text"
                name="username"
                maxLength={15}
                minLength={3}
                required
                autoComplete="new-username"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                onBlur={checkUsername}
              />

              {userInfo.username !== username && (
                <span className="checkstatus">
                  {usernameValidation === true && username.length >= 3 && (
                    <i className="available">
                      {validField} Username available.
                    </i>
                  )}
                  {usernameValidation === false && username.length >= 3 && (
                    <i className="taken">{invalidField} Username taken.</i>
                  )}
                </span>
              )}

              <input
                type="tel"
                maxLength={10}
                name="phone"
                required
                autoComplete="new-phone"
                placeholder="Enter phone, e.g 0712xxxxx78"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                onBlur={checkPhone}
              />

              {userInfo.phone !== `254${phone.substring(1)}` && (
                <span className="checkstatus">
                  {phoneValidation === true && phone.length === 10 && (
                    <i className="available">{validField} Phone available.</i>
                  )}
                  {phoneValidation === false && phone.length === 10 && (
                    <i className="taken">{invalidField} Phone taken.</i>
                  )}
                </span>
              )}

              <input
                type="text"
                name="email"
                autoComplete="new-email"
                required
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onBlur={checkEmail}
              />

              {userInfo.email !== email && (
                <span className="checkstatus">
                  {emailValidation === true && (
                    <i className="available">{validField} Email available.</i>
                  )}
                  {emailValidation === false && email.length > 0 && (
                    <i className="taken">{invalidField} Email taken.</i>
                  )}
                </span>
              )}

              <input
                type="text"
                name="password"
                autoComplete="new-password"
                minLength={4}
                placeholder="Enter new password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button
                disabled={
                  !username ||
                  !phone ||
                  phone.length !== 10 ||
                  !email ||
                  password.length < 4
                    ? true
                    : false
                }
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
