import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/team.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Home } from "./home";
import { Menu } from "./menu";

const goldwinAPI = "http://localhost:8000";

export const Team = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const adminUsername = "ceo";

  const navigate = useNavigate();

  const [team, setTeam] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [successfulLogin, setSuccessfulLogin] = useState(false);

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

  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userInfo.username}/team`
        );
        if (res.data) {
          setTeam(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getTeam();
  }, [userInfo.username]);

  const upgradeMember = (id) => async (e) => {
    e.preventDefault();

    const res = await axios.put(`${goldwinAPI}/api/user/upgrade-member/${id}`, {
      referralID: adminUsername,
    });

    if (res.data) {
      toast.success("Upgraded successfully.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        return window.location.reload();
      }, 1000);
    } else {
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

  const teamLogin = (id) => async (e) => {
    e.preventDefault();

    const res = await axios.post(`${goldwinAPI}/api/user/login/${id}`, {
      username: userInfo.username,
    });

    if (res.data.status === true) {
      localStorage.setItem(
        "JSUD",
        JSON.stringify({ SESSID: res.data.result._id, UTKN: res.data.tokenID })
      );
      toast.success(
        `You now have exclusive access to ${res.data.result.username}! Get ready to unlock your full potential and dominate like never before.`,
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

      toast.success(
        "Hold on for a moment as we gather all the details to set you up for success. Happy profits!",
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

      setTimeout(() => {
        setSuccessfulLogin(true);
        return navigate("/");
      }, 4000);
    } else {
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

  const deleteMember = (id) => async (e) => {
    e.preventDefault();

    const res = await axios.delete(
      `${goldwinAPI}/api/user/delete-member/${id}`
    );

    if (res.data) {
      toast.success("Downline deleted successfully.", {
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

      setTimeout(() => {
        return window.location.reload();
      }, 4000);
    } else {
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
    window.scrollTo(0, 0);
  }, []);

  if (successfulLogin) {
    return <Home />;
  }
  return (
    <>
      {userData !== null ? (
        <div className="team_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />
          <h3>My team</h3>
          <div className="team">
            {team.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                {team.length > 0 &&
                  team.map((member, index) => {
                    return (
                      <tbody key={index + "." + member._id}>
                        <tr>
                          <td>{member.username}</td>
                          <td>{member.phone}</td>
                          <td>{member.depositBalance}</td>
                          <td>
                            <button onClick={upgradeMember(member._id)}>
                              Upgrade
                            </button>
                            <button onClick={deleteMember(member._id)}>
                              Delete
                            </button>
                            <button onClick={teamLogin(member._id)}>
                              Login
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            ) : (
              <div className="no_team">Your team will appear here!</div>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
