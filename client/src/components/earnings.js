import React, { useEffect, useState } from "react";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/earnings.css";
import { MdOutlineArrowDownward } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiSpinnerBallLight } from "react-icons/pi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { PiHandDeposit, PiPencilLineLight } from "react-icons/pi";
import axios from "axios";
import { Login } from "./login";
import { GoGift } from "react-icons/go";
import { BsPiggyBank } from "react-icons/bs";

const goldwinAPI = "http://46.202.173.77:8000";

export const Earnings = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const userID = userData.SESSID;

  const adminUsername = "ceo";

  const [userInfo, setUserInfo] = useState({});
  const [withdrawableBalance, setWithdrawableBalance] = useState(null);
  const [depositBalance, setDepositBalance] = useState(null);
  const [investmentsBalance, setInvestmentsBalance] = useState(null);
  const [whatsappBalance, setWhatsappBalance] = useState(null);
  const [cashbackBalance, setCashbackBalance] = useState(null);
  const [uplineInfo, setUplineInfo] = useState({});
  const [uplineBalance, setUplineBalance] = useState(null);
  const [loansBalance, setLoansBalance] = useState(null);
  const [spinningBalance, setSpinningBalance] = useState(null);
  const [whatsappWithdrawnBalance, setWhatsappWithdrawnBalance] =
    useState(null);
  const [academicBalance, setAcademicBalance] = useState(null);
  const [agentWithdrawnBalance, setAgentWithdrawnBalance] = useState(null);
  const [adminBalance, setAdminBalance] = useState(null);

  const totalEarnings =
    whatsappBalance +
    cashbackBalance +
    investmentsBalance +
    depositBalance +
    withdrawableBalance +
    loansBalance +
    spinningBalance +
    whatsappWithdrawnBalance +
    academicBalance +
    agentWithdrawnBalance;

  const spinningBalanceBar = Math.round(
    (userInfo.spinningBalance / totalEarnings) * 100
  );

  const loansBalanceBar = Math.round(
    (userInfo.loansBalance / totalEarnings) * 100
  );

  const investmentsBalanceBar = Math.round(
    (userInfo.investmentsBalance / totalEarnings) * 100
  );

  const withdrawableBalanceBar = Math.round(
    (userInfo.withdrawableBalance / totalEarnings) * 100
  );

  const depositBalanceBar = Math.round(
    (userInfo.depositBalance / totalEarnings) * 100
  );

  const academicBalanceBar = Math.round(
    (userInfo.academicBalance / totalEarnings) * 100
  );

  const cashackBalanceBar = Math.round(
    (userInfo.cashbackBalance / totalEarnings) * 100
  );

  const whatsappBalanceBar = Math.round(
    (userInfo.whatsappBalance / totalEarnings) * 100
  );

  const whatsappWithdrawnBalanceBar = Math.round(
    (userInfo.whatsappWithdrawnBalance / totalEarnings) * 100
  );

  const agentWithdrawnBalanceBar = Math.round(
    (userInfo.agentWithdrawnBalance / totalEarnings) * 100
  );

  const checkDepositBalance =
    userInfo.depositBalance > 0.4 * userInfo.cashbackBalance;

  const claimCashback = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };
    const config = {
      headers: headers,
    };

    try {
      if (checkDepositBalance && userInfo.cashbackBalance > 0) {
        const res = await axios.patch(
          `${goldwinAPI}/api/user/${userID}/claim-cashback`,
          {
            withdrawableBalance: withdrawableBalance + userInfo.cashbackBalance,
          },
          config
        );

        if (res.data) {
          toast.success(
            `Congratulations ${res.data.result.username}, You claimed your cashback successfully.`,
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
            return window.location.reload();
          }, 4000);
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

  const handleCashbackBalance = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };
    const config = {
      headers: headers,
    };

    try {
      if (checkDepositBalance && userInfo.cashbackBalance > 0) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userID}/cashback-balance`,
          {
            cashbackBalance:
              userInfo.cashbackBalance - userInfo.cashbackBalance,
          },
          config
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDepositBalance = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };
    const config = {
      headers: headers,
    };

    let cashbackFee = 0.4 * userInfo.cashbackBalance;

    try {
      if (checkDepositBalance && userInfo.cashbackBalance > 0) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${userID}/new-balance`,
          {
            depositBalance: userInfo.depositBalance - cashbackFee,
          },
          config
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUplineWithdrawableBalance = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };
    const config = {
      headers: headers,
    };

    let uplineCashbackCommission = 0.264 * userInfo.cashbackBalance;

    try {
      if (checkDepositBalance && userInfo.cashbackBalance > 0) {
        return await axios.patch(
          `${goldwinAPI}/api/user/${uplineInfo._id}/commission`,
          {
            withdrawableBalance: uplineBalance + uplineCashbackCommission,
          },
          config
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAdminBalance = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.UTKN}`,
    };
    const config = {
      headers: headers,
    };

    let adminCashbackCommission = 0.136 * userInfo.cashbackBalance;

    try {
      if (checkDepositBalance && userInfo.cashbackBalance > 0) {
        return await axios.patch(
          `${goldwinAPI}/api/admin/${adminUsername}/new-balance`,
          {
            adminBalance: adminBalance + adminCashbackCommission,
          },
          config
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userID}/user-data`
        );
        if (res.data) {
          setUserInfo(res.data);
          setDepositBalance(+res.data.depositBalance);
          setWithdrawableBalance(+res.data.withdrawableBalance);
          setInvestmentsBalance(+res.data.investmentsBalance);
          setWhatsappBalance(+res.data.whatsappBalance);
          setCashbackBalance(+res.data.cashbackBalance);
          setSpinningBalance(+res.data.spinningBalance);
          setLoansBalance(+res.data.loansBalance);
          setAgentWithdrawnBalance(+res.data.agentWithdrawnBalance);
          setAcademicBalance(+res.data.academicBalance);
          setWhatsappWithdrawnBalance(+res.data.whatsappWithdrawnBalance);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserData();
  }, [userID, withdrawableBalance]);

  useEffect(() => {
    const getUplineData = async () => {
      try {
        const res = await axios.get(
          `${goldwinAPI}/api/user/${userInfo.referralID}/upline`
        );
        if (res.data) {
          setUplineInfo(res.data);
          setUplineBalance(+res.data.withdrawableBalance);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getUplineData();
  }, [userInfo.referralID]);

  useEffect(() => {
    const getAdminBalance = async () => {
      try {
        const res = await axios.post(`${goldwinAPI}/api/admin/username`, {
          username: adminUsername,
        });

        if (res.data.adminData) {
          setAdminBalance(+res.data.adminData.adminBalance);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAdminBalance();
  }, [adminUsername]);

  return (
    <>
      {userData !== null &&
      (whatsappWithdrawnBalanceBar &&
        whatsappBalanceBar &&
        cashackBalanceBar &&
        depositBalanceBar &&
        academicBalanceBar &&
        spinningBalanceBar &&
        investmentsBalanceBar &&
        withdrawableBalanceBar) !== isNaN ? (
        <div className="earningswrapper">
          <div className="earningstop">
            <MdSpaceDashboard />
            Dashboard
          </div>
          <div className="earningscontainer">
            <div className="whatsapp">
              <div className="whatsapptop">
                <MdOutlineAccountBalanceWallet className="whatsappicon" />
                Wallet Balance
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.whatsappBalance !== undefined
                  ? userInfo.whatsappBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {whatsappBalanceBar !== isNaN && (
                  <span style={{ width: `${whatsappBalanceBar}%` }}></span>
                )}
                {whatsappBalanceBar !== isNaN && (
                  <span>{whatsappBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="whatsapp">
              <div className="whatsapptop">
                <MdOutlineArrowDownward className="whatsappicon" />
                Withdrawn
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.whatsappWithdrawnBalance !== undefined
                  ? userInfo.whatsappWithdrawnBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {whatsappWithdrawnBalanceBar !== isNaN && (
                  <span
                    style={{ width: `${whatsappWithdrawnBalanceBar}%` }}
                  ></span>
                )}
                {whatsappWithdrawnBalanceBar !== isNaN && (
                  <span>{whatsappWithdrawnBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="cashback">
              <div className="cashbacktop">
                <div>
                  <GoGift className="cashbackicon" />
                  Cashback Balance
                </div>
                <button
                  onClick={(e) => {
                    claimCashback(e);
                    handleCashbackBalance(e);
                    handleDepositBalance(e);
                    handleUplineWithdrawableBalance(e);
                    handleAdminBalance(e);
                  }}
                  disabled={userInfo.cashbackBalance === 0 ? true : false}
                >
                  Redeem
                </button>
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.cashbackBalance !== undefined
                  ? userInfo.cashbackBalance
                  : 0}
                .00
              </div>
              <br />

              <div className="percentage">
                {cashackBalanceBar !== isNaN && (
                  <span style={{ width: `${cashackBalanceBar}%` }}></span>
                )}
                {cashackBalanceBar !== isNaN && (
                  <span>{cashackBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="spin">
              <div className="spintop">
                <PiSpinnerBallLight className="spinicon" />
                Spinning Balance
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.spinningBalance !== undefined
                  ? userInfo.spinningBalance
                  : 0}
                .00
              </div>
              <br />
              <br />
              <div className="percentage">
                {spinningBalanceBar !== isNaN && (
                  <span style={{ width: `${spinningBalanceBar}%` }}></span>
                )}
                {spinningBalanceBar !== isNaN && (
                  <span>{spinningBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="loans">
              <div className="loanstop">
                <BsPiggyBank className="loansicon" />
                Loans Balance
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.loansBalance !== undefined
                  ? userInfo.loansBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {loansBalanceBar !== isNaN && (
                  <span style={{ width: `${loansBalanceBar}%` }}></span>
                )}
                {loansBalanceBar !== isNaN && <span>{loansBalanceBar}%</span>}
              </div>
            </div>

            <div className="invest">
              <div className="investtop">
                <HiMiniArrowTrendingUp className="investicon" />
                Investments Balance
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.investmentsBalance !== undefined
                  ? userInfo.investmentsBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {investmentsBalanceBar !== isNaN && (
                  <span style={{ width: `${investmentsBalanceBar}%` }}></span>
                )}
                {investmentsBalanceBar !== isNaN && (
                  <span>{investmentsBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="academic">
              <div className="academictop">
                <PiPencilLineLight className="academicicon" />
                Academic Balance
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.academicBalance !== undefined
                  ? userInfo.academicBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {academicBalanceBar !== isNaN && (
                  <span style={{ width: `${academicBalanceBar}%` }}></span>
                )}
                {academicBalanceBar !== isNaN && (
                  <span>{academicBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="deposit">
              <div className="deposittop">
                <PiHandDeposit className="depositicon" />
                Deposit Balance
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.depositBalance !== undefined
                  ? userInfo.depositBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {depositBalanceBar !== isNaN && (
                  <span style={{ width: `${depositBalanceBar}%` }}></span>
                )}
                {depositBalanceBar !== isNaN && (
                  <span>{depositBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="agent">
              <div className="agenttop">
                <MdOutlineAccountBalanceWallet className="agenticon" />
                <div>Agent Balance</div>
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.withdrawableBalance !== undefined
                  ? userInfo.withdrawableBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {withdrawableBalanceBar !== isNaN && (
                  <span style={{ width: `${withdrawableBalanceBar}%` }}></span>
                )}
                {withdrawableBalanceBar !== isNaN && (
                  <span>{withdrawableBalanceBar}%</span>
                )}
              </div>
            </div>

            <div className="agent">
              <div className="agenttop">
                <MdOutlineArrowDownward className="agenticon" />
                Withdrawn
              </div>
              <div className="balance">
                KES{" "}
                {userInfo.agentWithdrawnBalance !== undefined
                  ? userInfo.agentWithdrawnBalance
                  : 0}
                .00
              </div>
              <br />
              <div className="percentage">
                {agentWithdrawnBalanceBar !== isNaN && (
                  <span
                    style={{ width: `${agentWithdrawnBalanceBar}%` }}
                  ></span>
                )}
                {agentWithdrawnBalanceBar !== isNaN && (
                  <span>{agentWithdrawnBalanceBar}%</span>
                )}
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
