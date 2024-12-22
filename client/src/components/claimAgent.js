import React, { useEffect, useState } from "react";
import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { redirect, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDoDisturb } from "react-icons/md";
import "../styles/claimAgent.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = "http://localhost:8000";

export const Claim = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const navigate = useNavigate();

  const adminUsername = "ceo";

  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [agentInfo, setAgentInfo] = useState({});
  const [adminBalance, setAdminBalance] = useState(null);

  const validField = <IoMdCheckmarkCircle className="valid" />;
  const invalidField = <IoIosCloseCircle className="invalid" />;
  const invalidUsername = <MdDoDisturb className="nodisturb" />;

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

  let claimFee = 50;

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const res = await axios.post(`${goldwinAPI}/api/user/check-username`, {
          userName: username,
        });

        console.log(res.data);

        if (res.data) {
          setUsernameValidation(true);
        } else {
          setUsernameValidation(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkUsername();
  }, [username]);

  useEffect(() => {
    const getAdminBalance = async () => {
      try {
        const res = await axios.post(`${goldwinAPI}/api/admin/username`, {
          username: adminUsername,
        });

        if (res.data.adminData) {
          setAdminBalance(+res.data.adminData.adminBalance);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAdminBalance();
  }, [adminUsername]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getAgentInfo = async () => {
    try {
      const res = await axios.get(`${goldwinAPI}/api/user/${username}/agent`);

      if (res.data) {
        setAgentInfo(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const claimAgent = async () => {
    if (userInfo.depositBalance < claimFee) {
      return toast.warn(
        `Hi ${userInfo.username}, You're required to have KES 50.00 to claim agent successfully.`,
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
    try {
      if (userInfo.depositBalance > claimFee && usernameValidation === true) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${agentInfo._id}/claim`,
          {
            referralID: userInfo.username,
          }
        );

        if (res.data) {
          return toast.success(`You've claimed ${username} successfully.`, {
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

  const updateDepositBalance = async () => {
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
      if (userInfo.depositBalance > claimFee && usernameValidation === true) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/new-balance`,
          {
            depositBalance: userInfo.depositBalance - claimFee,
          },
          config
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const plusClaim = async () => {
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
      if (userInfo.depositBalance > claimFee && usernameValidation === true) {
        return await axios.patch(
          `${goldwinAPI}/api/admin/${adminUsername}/new-balance`,
          {
            adminBalance: adminBalance + claimFee,
          },
          config
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {userData !== null ? (
        <div className="claim_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <div className="claim">
            <h3>Claim agent</h3>

            <input
              type="text"
              name="username"
              required
              placeholder="Enter username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onBlur={getAgentInfo}
            />

            <span className="checkstatus">
              {userInfo.username !== username &&
                usernameValidation === true &&
                agentInfo.referralID !== adminUsername &&
                agentInfo.referralID !== userInfo.username &&
                username.length > 0 && (
                  <i className="available">{validField} Username available.</i>
                )}

              {(userInfo.username === username ||
                agentInfo.referralID === adminUsername ||
                agentInfo.referralID === userInfo.username) &&
                username.length > 0 && (
                  <i className="taken">{invalidUsername} Username blocked.</i>
                )}

              {usernameValidation === false &&
                agentInfo.referralID !== adminUsername &&
                agentInfo.referralID !== userInfo.username &&
                username.length > 0 && (
                  <i className="taken">
                    {invalidField} Username not available.
                  </i>
                )}
            </span>

            {userInfo.depositBalance < claimFee ? (
              <small>Insufficient balance</small>
            ) : null}

            <button
              onClick={(e) => {
                claimAgent(e);
                updateDepositBalance(e);
                plusClaim(e);
              }}
              disabled={
                usernameValidation === false ||
                userInfo.username === username ||
                agentInfo.referralID === userInfo.username ||
                agentInfo._id === undefined ||
                agentInfo.referralID === adminUsername ||
                adminBalance === null ||
                userInfo.depositBalance < claimFee
                  ? true
                  : false
              }
            >
              Claim
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
