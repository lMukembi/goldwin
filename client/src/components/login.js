import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Logo from "../assets/images/Logo.png";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./home";
import "../styles/login.css";
import axios from "axios";

const goldwinAPI = "https://api.goldwinadverts.com";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        `${goldwinAPI}/api/user/login`,
        {
          email,
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

        toast.success(
          `Welcome back ${res.data.result.username}, You logged in successfully.`,
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
          return navigate("/");
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

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (successfulLogin) {
    return <Home />;
  }
  return (
    <div className="loginwrapper">
      <div className="header">
        <img src={Logo} alt="" />
        <h2>Goldwin Adverts</h2>
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
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="new-password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <i onClick={handleShowPassword} className="showLoginPassword">
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
        </i>

        <button>Login</button>

        <div className="logininfo">
          <div>
            Don't have an account?
            <Link to="/signup" className="link">
              Signup
            </Link>
          </div>
        </div>
        <div className="logininfo">
          <div>
            <Link to="/reset-password" className="link">
              Forgot password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
