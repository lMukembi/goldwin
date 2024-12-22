import React, { useEffect, useState } from "react";
import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { redirect } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/claimAgent.css";
import axios from "axios";
import { AdminMenu } from "./adminMenu";
import { Header } from "../../components/header";
import { Login } from "../../components/login";
import { MdDoDisturb } from "react-icons/md";

const goldwinAPI = process.env.SERVER_URL;

export const UpgradeAgent = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [agentInfo, setAgentInfo] = useState({});

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
          `${goldwinAPI}/api/admin/${userID}/admin-data`
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

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const res = await axios.post(`${goldwinAPI}/api/admin/username`, {
          username,
        });

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
    try {
      if (usernameValidation === true) {
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

  return (
    <>
      {userData !== null ? (
        <div className="claim_wrapper">
          {window.innerWidth > 768 && <AdminMenu />}

          <Header />

          <div className="claim">
            <h3>Upgrade Agent</h3>

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
                username.length > 0 && (
                  <i className="available">{validField} Username available.</i>
                )}

              {usernameValidation === false && username.length > 0 && (
                <i className="taken">{invalidField} Username not available.</i>
              )}

              {username === "ceo" && usernameValidation === true && (
                <i className="taken">{invalidUsername} Username blocked.</i>
              )}
            </span>

            <button
              onClick={(e) => {
                claimAgent(e);
              }}
              disabled={
                usernameValidation === false || userInfo.username === username
                  ? true
                  : false
              }
            >
              Upgrade Agent
            </button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
