import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import "../styles/forgotPassword.css";
import axios from "axios";

const goldwinAPI = "http://46.202.173.77:8000";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const forgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${goldwinAPI}/api/user/reset-password`, {
        email,
      });

      if (res.data) {
        toast.success("Check your email. We sent a reset password link.", {
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
          return navigate("/login");
        }, 4000);
      }
    } catch (error) {
      toast.error("Invalid email.", {
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
    <div className="forgotpassword">
      <div className="header">
        <img src={Logo} alt="" />
        <h2>Goldwin Adverts</h2>
      </div>
      <hr />
      <form onSubmit={(e) => forgotPassword(e)}>
        <input
          type="text"
          name="email"
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button>Send</button>
      </form>
    </div>
  );
};
