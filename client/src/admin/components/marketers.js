import React, { useEffect, useState } from "react";
import "../../styles/team.css";
import { Login } from ".././login";
import axios from "axios";
import { Home } from ".././home";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "./adminHeader";
import { AdminMenu } from "./adminMenu";

const goldwinAPI = "http://localhost:8000";

export const Marketers = () => {
  const adminData = JSON.parse(localStorage.getItem("JSUD"));

  const navigate = useNavigate();

  const [team, setTeam] = useState([]);
  const [adminInfo, setAdminInfo] = useState({});
  const [successfulLogin, setSuccessfulLogin] = useState(false);

  useEffect(() => {
    const getAdminData = async () => {
      const adminID = adminData.SESSID;
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/admin/${adminID}/admin-data`
        );

        if (res.data.isAdmin === true) {
          setAdminInfo(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAdminData();
  }, [adminData.SESSID]);

  useEffect(() => {
    const getTeam = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/user/${adminInfo.username}/team`
        );
        if (res.data) {
          setTeam(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getTeam();
  }, [adminInfo.username]);

  const teamLogin = (id) => async (e) => {
    e.preventDefault();

    const res = await axios.post(`${goldwinAPI}/api/user/login/${id}`, {
      username: adminInfo.username,
    });

    if (res.data.status === true) {
      localStorage.setItem(
        "JSUD",
        JSON.stringify({ SESSID: res.data.result._id, UTKN: res.data.tokenID })
      );
      setSuccessfulLogin(true);
      return navigate("/");
    } else {
      setSuccessfulLogin(false);
      return alert("Something went wrong!");
    }
  };

  const deleteMember = (id) => async (e) => {
    e.preventDefault();

    const res = await axios.delete(
      `${goldwinAPI}/api/user/delete-member/${id}`
    );

    if (res.data) {
      return window.location.reload();
    } else {
      return alert("Something went wrong!");
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
      {adminInfo !== null ? (
        <div className="team_wrapper">
          {window.innerWidth > 768 && <AdminMenu />}

          <AdminHeader />
          <h3>Marketers</h3>
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
