import React, { useEffect, useReducer, useState } from "react";
import "../styles/tokens.css";
import { Header } from "./header";
import { Login } from "./login";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu } from "./menu";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const goldwinAPI = process.env.SERVER_URL;

export const Tokens = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [uplineInfo, setUplineInfo] = useState({});
  const [uplineWithdrawableBalance, setUplineWithdrawableBalance] =
    useState(null);
  const [userCashback, setUserCashback] = useState(null);

  const initialState = {
    authFee: 2800,
    accessFee: 3500,
    gateFee: 5500,
    credentialFee: 8000,
    entityFee: 12000,
    error: null,
    loading: true,
  };

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
        if (res.data) {
          setUserInfo(res.data);
          setUserCashback(+res.data.cashbackBalance);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserData();
  }, []);

  const tokenReducer = (state, action) => {
    switch (action.type) {
      case "AUTH": {
        const hasError = userInfo.depositBalance < state.authFee;
        return {
          ...state,
          authFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }

      case "ACCESS": {
        const hasError = userInfo.depositBalance < state.accessFee;
        return {
          ...state,
          accessFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }

      case "GATE": {
        const hasError = userInfo.depositBalance < state.gateFee;
        return {
          ...state,
          gateFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }

      case "CREDENTIAL": {
        const hasError = userInfo.depositBalance < state.credentialFee;
        return {
          ...state,
          credentialFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }

      case "ENTITY": {
        const hasError = userInfo.depositBalance < state.entityFee;
        return {
          ...state,
          entityFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(tokenReducer, initialState);

  const checkAuthFee = userInfo.depositBalance > state.authFee;
  const checkAccesFee = userInfo.depositBalance > state.accessFee;
  const checkGateFee = userInfo.depositBalance > state.gateFee;
  const checkCredentialFee = userInfo.depositBalance > state.credentialFee;
  const checkEntityFee = userInfo.depositBalance > state.entityFee;

  const auth = async () => {
    const authValue = "Starter";

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

    if (checkAuthFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 2,800.00 to purchase your Starter code.`,
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

    if (checkAuthFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/token`,
        {
          serviceToken: authValue,
          userID: userData.SESSID,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.authFee
        }.00 for unlocking the Starter code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkAuthFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/token`,
          {
            depositBalance: userInfo.depositBalance - state.authFee,
            serviceToken: authValue,
            userID: userData.SESSID,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.authFee
            }.00 for unlocking the Starter code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const access = async () => {
    const accessValue = "Intermediate";

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

    if (checkAccesFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 3,500.00 to purchase your Intermediate code.`,
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

    if (checkAccesFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/token`,
        {
          serviceToken: accessValue,
          userID: userData.SESSID,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.accessFee
        }.00 for unlocking the Intermediate code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkAccesFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/token`,
          {
            depositBalance: userInfo.depositBalance - state.accessFee,
            serviceToken: accessValue,
            userID: userData.SESSID,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.accessFee
            }.00 for unlocking the Intermediate code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const gate = async () => {
    const gateValue = "Advanced";

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

    if (checkGateFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 5,500.00 to purchase your Advanced code.`,
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

    if (checkGateFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/token`,
        {
          serviceToken: gateValue,
          userID: userData.SESSID,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.gateFee
        }.00 for unlocking the Advanced code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkGateFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/token`,
          {
            depositBalance: userInfo.depositBalance - state.gateFee,
            serviceToken: gateValue,
            userID: userData.SESSID,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.gateFee
            }.00 for unlocking the Advanced code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const credential = async () => {
    const credentialValue = "Expert";

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

    if (checkCredentialFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 8,000.00 to purchase your Expert code.`,
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

    if (checkCredentialFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/token`,
        {
          serviceToken: credentialValue,
          userID: userData.SESSID,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.credentialFee
        }.00 for unlocking the Expert code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkCredentialFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/token`,
          {
            depositBalance: userInfo.depositBalance - state.credentialFee,
            serviceToken: credentialValue,
            userID: userData.SESSID,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.credentialFee
            }.00 for unlocking the Expert code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const entity = async () => {
    const entityValue = "Professional";

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

    if (checkEntityFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 12,000.00 to purchase your Professional code.`,
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

    if (checkEntityFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/token`,
        {
          serviceToken: entityValue,
          userID: userData.SESSID,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.entityFee
        }.00 for unlocking the Professional code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkEntityFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/token`,
          {
            depositBalance: userInfo.depositBalance - state.entityFee,
            serviceToken: entityValue,
            userID: userData.SESSID,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.entityFee
            }.00 for unlocking the Professional code. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const authCommission = async () => {
    const authCommission = 0.75 * state.authFee;

    try {
      if (checkAuthFee) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineWithdrawableBalance + authCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const accessCommission = async () => {
    const accessCommission = 0.75 * state.accessFee;

    try {
      if (checkAccesFee && uplineInfo._id !== undefined) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineWithdrawableBalance + accessCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const gateCommission = async () => {
    const gateCommission = 0.75 * state.supremeFee;

    try {
      if (checkGateFee) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineWithdrawableBalance + gateCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const credentialCommission = async () => {
    const credentialCommission = 0.75 * state.credentialFee;

    try {
      if (checkCredentialFee) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance:
              uplineWithdrawableBalance + credentialCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const entityCommission = async () => {
    const entityCommission = 0.75 * state.entityFee;

    try {
      if (checkCredentialFee) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineWithdrawableBalance + entityCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const authCashback = async () => {
    let cashback = 3 * state.authFee;

    try {
      if (
        (checkAuthFee && userData !== null) ||
        userInfo.referralID === "ceo"
      ) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/cashback-balance`,
          {
            cashbackBalance: userCashback + cashback,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const accessCashback = async () => {
    let cashback = 3 * state.accessFee;

    try {
      if (
        (checkAccesFee && userData !== null) ||
        userInfo.referralID === "ceo"
      ) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/cashback-balance`,
          {
            cashbackBalance: userCashback + cashback,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const gateCashback = async () => {
    let cashback = 3 * state.gateFee;

    try {
      if (
        (checkGateFee && userData !== null) ||
        userInfo.referralID === "ceo"
      ) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/cashback-balance`,
          {
            cashbackBalance: userCashback + cashback,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const credentialCashback = async () => {
    let cashback = 3 * state.credentialFee;

    try {
      if (
        (checkCredentialFee && userData !== null) ||
        userInfo.referralID === "ceo"
      ) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/cashback-balance`,
          {
            cashbackBalance: userCashback + cashback,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const entityCashback = async () => {
    let cashback = 3 * state.entityFee;

    try {
      if (
        (checkEntityFee && userData !== null) ||
        userInfo.referralID === "ceo"
      ) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/cashback-balance`,
          {
            cashbackBalance: userCashback + cashback,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const tokenExpireAt = async () => {
    if (userData === null) {
      return navigate("/login");
    }

    const id = userData.SESSID;

    try {
      if (checkEntityFee || userInfo.referralID === "ceo") {
        const res = await axios.post(
          `${goldwinAPI}/api/user/${id}/token-expires`,
          {
            userID: id,
          }
        );

        if (res.data) {
          return toast.success(
            `Dear ${userInfo.username}, your premium code {${res.data.data.secret}} received successfully. You can copy and use it immediately. We've also sent it to your email for confirmation. Happy profits!`,
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUplineData = async () => {
      try {
        if (userInfo.referralID === "ceo") {
          const res = await axios.get(
            `${goldwinAPI}/api/user/${userInfo.referralID}/admin`
          );
          if (res.data) {
            setUplineInfo(res.data);
            setUplineWithdrawableBalance(+res.data.withdrawableBalance);
          }
        } else {
          const res = await axios.get(
            `${goldwinAPI}/api/user/${userInfo.referralID}/upline`
          );
          if (res.data) {
            setUplineInfo(res.data);
            setUplineWithdrawableBalance(+res.data.withdrawableBalance);
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUplineData();
  }, [userInfo.referralID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {userData !== null ? (
        <div className="tokens_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />
          <div className="tokens">
            <h3>Premium Codes</h3>
            <div className="auth_token">
              <div>
                <h4>Starter</h4>
                <div>1-click withdrawal</div>
                <div>Instant M-Pesa cashback</div>
              </div>

              <div>
                {checkAuthFee === true && <small>{state.error}</small>}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "AUTH" });
                    auth();
                    authCommission();
                    authCashback();
                    tokenExpireAt();
                  }}
                >
                  {userInfo.serviceToken === "Starter" ? (
                    <>Active</>
                  ) : (
                    <>Buy 2,800.00 KES</>
                  )}
                </button>
              </div>
            </div>

            <div className="access_keycard">
              <div>
                <h4>Intermediate</h4>
                <div>1-click withdrawal</div>
                <div>5 users</div>
                <div>Instant M-Pesa cashback</div>
              </div>

              <div>
                {checkAccesFee === true && <small>{state.error}</small>}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "ACCESS" });
                    access();
                    accessCommission();
                    accessCashback();
                    tokenExpireAt();
                  }}
                >
                  {userInfo.serviceToken === "Intermediate" ? (
                    <>Active</>
                  ) : (
                    <>Buy 3,500.00 KES</>
                  )}
                </button>
              </div>
            </div>

            <div className="gate_pass">
              <div>
                <h4>Advanced</h4>
                <div>1-click withdrawal</div>
                <div>10 users</div>
                <div>Instant M-Pesa withdrawals</div>
                <div>Instant M-Pesa cashback</div>
              </div>

              <div>
                {checkGateFee === true && <small>{state.error}</small>}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "GATE" });
                    gate();
                    gateCommission();
                    gateCashback();
                    tokenExpireAt();
                  }}
                >
                  {userInfo.serviceToken === "Advanced" ? (
                    <>Active</>
                  ) : (
                    <>Buy 5,500.00 KES</>
                  )}
                </button>
              </div>
            </div>

            <div className="credential_token">
              <div>
                <h4>Expert</h4>
                <div>1-click withdrawal</div>
                <div>50 users</div>
                <div>Instant M-Pesa withdrawals</div>
                <div>Instant M-Pesa cashback</div>
                <div>Free renewal</div>
              </div>

              <div>
                {checkCredentialFee === true && <small>{state.error}</small>}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "CREDENTIAL" });
                    credential();
                    credentialCommission();
                    credentialCashback();
                    tokenExpireAt();
                  }}
                >
                  {userInfo.serviceToken === "Expert" ? (
                    <>Active</>
                  ) : (
                    <>Buy 8,000.00 KES</>
                  )}
                </button>
              </div>
            </div>

            <div className="entity_token">
              <div>
                <h4>Professional</h4>
                <div>Access all features</div>
                <div>Unlimited lifetime access</div>
              </div>

              <div>
                {checkEntityFee === true && <small>{state.error}</small>}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "ENTITY" });
                    entity();
                    entityCommission();
                    entityCashback();
                  }}
                >
                  {userInfo.serviceToken === "Professional" ? (
                    <>Active</>
                  ) : (
                    <>Buy 12,000.00 KES</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
