import React, { useEffect, useReducer, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/packages.css";
import { Header } from "./header";
import { Login } from "./login";
import axios from "axios";
import { Menu } from "./menu";

const goldwinAPI = "http://localhost:8000";

export const Packages = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [userInfo, setUserInfo] = useState({});
  const [uplineInfo, setUplineInfo] = useState({});
  const [uplineBalance, setUplineBalance] = useState(null);
  const [userCashback, setUserCashback] = useState(null);

  const navigate = useNavigate();

  const initialState = {
    basicFee: 1000,
    standardFee: 2000,
    supremeFee: 3500,
    nobleFee: 5500,
    error: null,
    loading: true,
  };

  const upgradeReducer = (state, action) => {
    switch (action.type) {
      case "BASIC": {
        const hasError = userInfo.depositBalance < state.basicFee;
        return {
          ...state,
          basicFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }

      case "STANDARD": {
        const hasError = userInfo.depositBalance < state.standardFee;
        return {
          ...state,
          standardFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }

      case "SUPREME": {
        const hasError = userInfo.depositBalance < state.supremeFee;
        return {
          ...state,
          supremeFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }

      case "NOBLE": {
        const hasError = userInfo.depositBalance < state.nobleFee;
        return {
          ...state,
          nobleFee: action.payload,
          error: hasError ? "Insufficient balance." : null,
          loading: false,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(upgradeReducer, initialState);

  const checkBasicFee = userInfo.depositBalance > state.basicFee;
  const checkStandardFee = userInfo.depositBalance > state.standardFee;
  const checkSupremeFee = userInfo.depositBalance > state.supremeFee;
  const checkNobleFee = userInfo.depositBalance > state.nobleFee;

  const basicUpgrade = async () => {
    const basicValue = "Basic";

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

    if (checkBasicFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 1,000.00 to purchase your Basic package.`,
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

    if (checkBasicFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
        {
          servicePackage: basicValue,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.basicFee
        }.00 for purchasing Basic package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkBasicFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
          {
            depositBalance: userInfo.depositBalance - state.basicFee,
            servicePackage: basicValue,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.basicFee
            }.00 for purchasing Basic package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const standardUpgrade = async () => {
    const standardValue = "Standard";

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

    if (checkStandardFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 2,000.00 to purchase your Standard package.`,
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

    if (checkStandardFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
        {
          servicePackage: standardValue,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.standardFee
        }.00 for purchasing Standard package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkStandardFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
          {
            depositBalance: userInfo.depositBalance - state.standardFee,
            servicePackage: standardValue,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.standardFee
            }.00 for purchasing Standard package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const supremeUpgrade = async () => {
    const supremeValue = "Supreme";

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

    if (checkSupremeFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 3,500.00 to purchase your Supreme package.`,
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

    if (checkSupremeFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
        {
          servicePackage: supremeValue,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.supremeFee
        }.00 for purchasing Supreme package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkSupremeFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
          {
            depositBalance: userInfo.depositBalance - state.supremeFee,
            servicePackage: supremeValue,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.supremeFee
            }.00 for purchasing Supreme package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const nobleUpgrade = async () => {
    const nobleValue = "Noble";

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

    if (checkNobleFee === false && userInfo.referralID !== "ceo") {
      return toast.error(
        `Hi ${userInfo.username}, You're required to have KES 1,000.00 to purchase your Noble package.`,
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

    if (checkNobleFee === false && userInfo.referralID === "ceo") {
      await axios.put(
        `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
        {
          servicePackage: nobleValue,
        },
        config
      );

      return toast.success(
        `Congratulations ${userInfo.username}! You've just earned extra KES ${
          3 * state.nobleFee
        }.00 for purchasing Noble package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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
      if (checkNobleFee) {
        const res = await axios.put(
          `${goldwinAPI}/api/user/${userData.SESSID}/upgrade`,
          {
            depositBalance: userInfo.depositBalance - state.nobleFee,
            servicePackage: nobleValue,
          },
          config
        );

        if (res.data) {
          return toast.success(
            `Congratulations ${
              userInfo.username
            }! You've just earned extra KES ${
              3 * state.nobleFee
            }.00 for purchasing Noble package. This amount has been credited to your cashback balance and is ready for redemption once claimed. Happy profits!`,
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

  const basicCommission = async () => {
    const basicCommission = 0.85 * state.basicFee;

    try {
      if (checkBasicFee && uplineInfo._id !== undefined) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineBalance + basicCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const standardCommission = async () => {
    const standardCommission = 0.85 * state.standardFee;

    try {
      if (checkStandardFee && uplineInfo._id !== undefined) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineBalance + standardCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const supremeCommission = async () => {
    const supremeCommission = 0.85 * state.supremeFee;

    try {
      if (checkSupremeFee && uplineInfo._id !== undefined) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineBalance + supremeCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const nobleCommission = async () => {
    const nobleCommission = 0.85 * state.nobleFee;

    try {
      if (checkNobleFee && uplineInfo._id !== undefined) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineBalance + nobleCommission,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const basicCashback = async () => {
    let cashback = 3000;

    if (userData === null) {
      return navigate("/login");
    }

    try {
      if (checkBasicFee || userInfo.referralID === "ceo") {
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

  const standardCashback = async () => {
    const cashback = 6000;

    if (userData === null) {
      return navigate("/login");
    }

    try {
      if (checkStandardFee || userInfo.referralID === "ceo") {
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

  const supremeCashback = async () => {
    const cashback = 10500;

    if (userData === null) {
      return navigate("/login");
    }

    try {
      if (checkSupremeFee || userInfo.referralID === "ceo") {
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

  const nobleCashback = async () => {
    const cashback = 16500;

    if (userData === null) {
      return navigate("/login");
    }

    try {
      if (checkNobleFee || userInfo.referralID === "ceo") {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userData.SESSID}/cashback`,
          {
            cashbackBalance: userCashback + cashback,
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const packageExpireAt = async (e) => {
    e.preventDefault();

    if (userData === null) {
      return navigate("/login");
    }

    const id = userData.SESSID;

    try {
      if (checkNobleFee || userInfo.referralID === "ceo") {
        const res = await axios.post(
          `${goldwinAPI}/api/user/${id}/package-expires`
        );

        if (res.data) {
          return toast.success("Account updated successfully.", {
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
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
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

        if (res) {
          setUserInfo(res.data);
          setUserCashback(+res.data.cashbackBalance);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getUplineData = async () => {
      try {
        if (userInfo.referralID === "ceo") {
          const res = await axios.get(
            `${goldwinAPI}/api/user/${userInfo.referralID}/admin`
          );
          if (res.data) {
            setUplineInfo(res.data);
            setUplineBalance(+res.data.withdrawableBalance);
          }
        } else {
          const res = await axios.get(
            `${goldwinAPI}/api/user/${userInfo.referralID}/upline`
          );
          if (res.data) {
            setUplineInfo(res.data);
            setUplineBalance(+res.data.withdrawableBalance);
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
        <div className="packages_wrapper">
          {window.innerWidth > 768 && <Menu />}

          <Header />

          <h3>Service packages</h3>
          <div className="packages">
            <div className="basic_package">
              <div>
                <h4>Basic package</h4>
                <div>Whatsapp marketing</div>
                <div>Get Ksh 100 per view</div>
                <div>Advertise once weekly</div>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "BASIC" });
                    basicUpgrade(e);
                    basicCommission(e);
                    basicCashback(e);
                    packageExpireAt(e);
                  }}
                >
                  {userInfo.servicePackage === "Basic" ? (
                    <>Active</>
                  ) : (
                    <>Buy 1,000.00 KES</>
                  )}
                </button>
              </div>
            </div>

            <div className="standard_package">
              <div>
                <h4>Standard package</h4>
                <div>Whatsapp marketing</div>
                <div>Get Ksh 100 per view</div>
                <div>Advertise twice weekly</div>
                <div>24/7 Account support</div>
              </div>

              <div>
                {checkStandardFee === true && <small>{state.error}</small>}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: "STANDARD" });
                    standardUpgrade(e);
                    standardCommission(e);
                    standardCashback(e);
                    packageExpireAt(e);
                  }}
                >
                  {userInfo.servicePackage === "Standard" ? (
                    <>Active</>
                  ) : (
                    <>Buy 2,000.00 KES</>
                  )}
                </button>
              </div>
            </div>

            <div className="supreme_package">
              <div>
                <h4>Supreme package</h4>
                <div>Whatsapp marketing</div>
                <div>Get Ksh 100 per view</div>
                <div>Advertise thrice weekly</div>
                <div>24/7 Account support</div>
                <div>All time withdrawal</div>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault(e);
                    dispatch({ type: "SUPREME" });
                    supremeUpgrade(e);
                    supremeCommission(e);
                    supremeCashback(e);
                    packageExpireAt(e);
                  }}
                >
                  {userInfo.servicePackage === "Supreme" ? (
                    <>Active</>
                  ) : (
                    <>Buy 3,500.00 KES</>
                  )}
                </button>
              </div>
            </div>

            <div className="noble_package">
              <div>
                <h4>Noble package</h4>
                <div>Whatsapp marketing</div>
                <div>Get Ksh 100 per view</div>
                <div>Advertise daily</div>
                <div>24/7 Account support</div>
                <div>All time withdrawal</div>
                <div>Unlimited access</div>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault(e);
                    dispatch({ type: "NOBLE" });
                    nobleUpgrade(e);
                    nobleCommission(e);
                    nobleCashback(e);
                    packageExpireAt(e);
                  }}
                >
                  {userInfo.servicePackage === "Noble" ? (
                    <>Active</>
                  ) : (
                    <>Buy 5,500.00 KES</>
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
