import React, { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Home } from "../../components/home";
import "../../styles/login.css";
import axios from "axios";

const goldwinAPI = process.env.SERVER_URL;

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [secretCode, setSecretCode] = useState("");

  const navigate = useNavigate();

  const processLogin = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };
    try {
      const res = await axios.post(
        `${goldwinAPI}/api/admin/369/login`,
        {
          email,
          password,
          secretCode,
        },
        config
      );

      if (res.data.isAdmin === true) {
        localStorage.setItem(
          "JSUD",
          JSON.stringify({
            SESSID: res.data.adminData._id,
            UTKN: res.data.tokenID,
          })
        );
        toast.success(
          `Welcome back ${res.data.adminData.username}, You logged in successfully.`,
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
          }
        );

        setTimeout(() => {
          setSuccessfulLogin(true);
          return navigate("/369/isAdmin");
        }, 4000);
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
    window.scrollTo(0, 0);
  }, []);

  if (successfulLogin) {
    return <Home />;
  }
  return (
    <div className="loginwrapper">
      <div className="header">
        <h2>Admin panel</h2>
      </div>
      <hr />
      <form onSubmit={processLogin} className="login">
        <input
          type="text"
          name="email"
          autoComplete="new-email"
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <input
          type="number"
          name="code"
          autoComplete="new-code"
          placeholder="Enter secret code"
          onChange={(e) => setSecretCode(e.target.value)}
          value={secretCode}
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
};
