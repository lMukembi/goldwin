import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/images/Logo.png";
import "../styles/signup.css";
import { Home } from "./home";
import axios from "axios";

const goldwinAPI = process.env.SERVER_URL;

export const Signup = () => {
  const { username } = useParams();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const validField = <IoMdCheckmarkCircle className="valid" />;
  const invalidField = <IoIosCloseCircle className="invalid" />;

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validEmail = EMAIL_REGEX.test(email);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const res = await axios.post(`${goldwinAPI}/api/user/check-username`, {
          userName: username,
        });

        if (res.data) {
          navigate(`/SrBcNEtXZJlucFR/${username}`);
          return setUserInfo(res.data.data);
        } else {
          navigate("/signup");
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    checkUsername();
  }, [username, navigate]);

  const checkUserName = async () => {
    try {
      const res = await axios.post(`${goldwinAPI}/api/user/check-username`, {
        userName,
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
        `${goldwinAPI}/api/user/signup`,
        {
          phone: `254${phone.substring(1)}`,
          email,
          userName,
          password,
          referralID: userInfo.username,
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
          `Welcome ${res.data.result.username}, Your account created successfully.`,
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
          setSuccessfulSignup(true);
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
        <img src={Logo} alt="Goldwin Adverts" />
        <h2>Goldwin Adverts</h2>
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
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          onBlur={checkUserName}
        />

        {userInfo.username !== userName && (
          <span className="checkstatus">
            {usernameValidation === true && userName.length >= 3 && (
              <i className="available">{validField} Username available.</i>
            )}
            {usernameValidation === false && userName.length >= 3 && (
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
            {emailValidation === false && email.length > 0 && validEmail && (
              <i className="taken">{invalidField} Email taken.</i>
            )}
            {!validEmail && emailValidation === false && email.length > 5 && (
              <i className="taken">{invalidField} Invalid email.</i>
            )}
          </span>
        )}

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

        {userInfo.username !== undefined && username !== undefined && (
          <input
            type="text"
            name="referral"
            autoComplete="new-referral"
            placeholder="Enter referral code"
            required
            disabled
            value={userInfo.username}
          />
        )}

        <button
          disabled={
            !userName ||
            userName.length < 3 ||
            !phone ||
            phone.length !== 10 ||
            !email ||
            !password ||
            password.length < 4 ||
            (usernameValidation && phoneValidation && emailValidation) === false
              ? true
              : false
          }
        >
          Signup
        </button>
        <div className="logininfo">
          <div>
            Already have an account?
            <Link to="/login" className="link">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
