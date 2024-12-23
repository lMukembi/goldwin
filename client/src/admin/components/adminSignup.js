import React, { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Home } from "../../components/home";
import "../../styles/signup.css";
import axios from "axios";

const goldwinAPI = "https://api.goldwinadverts.com";

export const AdminSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [successfulSignup, setSuccessfulSignup] = useState(false);

  const processSignup = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    try {
      const res = await axios.post(
        `${goldwinAPI}/api/admin/369/signup`,
        {
          email,
          username,
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
          `Welcome ${res.data.adminData.username}, Your account created successfully.`,
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
    setSuccessfulSignup(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (successfulSignup) {
    return <Home />;
  }
  return (
    <div className="signupwrapper">
      <div className="header">
        <h2>Admin panel</h2>
      </div>
      <hr />

      <form onSubmit={processSignup} className="signup">
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
        />

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
          minLength={4}
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

        <button>Signup</button>
      </form>
    </div>
  );
};
