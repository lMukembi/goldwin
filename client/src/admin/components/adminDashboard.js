import React, { Fragment, useEffect, useState } from "react";
import "../../styles/withdraw.css";
import "../../styles/adminDashboard.css";
import axios from "axios";
import { MdOutlineReceiptLong, MdWavingHand } from "react-icons/md";
import { AdminLogin } from "./adminLogin";
import { ChristmassLights } from "../../components/christmassLights";
import { redirect } from "react-router-dom";
import { AdminWithdrawCard } from "./adminWithdrawCard";
import { AdminMenu } from "./adminMenu";
import { AdminHeader } from "./adminHeader";

const goldwinAPI = "http://localhost:8000";

export const AdminDashboard = () => {
  const adminData = JSON.parse(localStorage.getItem("JSUD"));

  const [adminInfo, setAdminInfo] = useState({});
  const [withdrawalMessages, setWithdrawalMessages] = useState([]);

  useEffect(() => {
    const getAdminData = async () => {
      const adminInfoData = JSON.parse(localStorage.getItem("JSUD"));

      if (!adminInfoData) {
        return redirect("/369/login");
      }

      const adminID = adminInfoData.SESSID;

      try {
        const res = await axios.get(
          `${goldwinAPI}/api/admin/${adminID}/admin-data`
        );

        if (res.data.isAdmin === true) {
          setAdminInfo(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getAdminData();
  }, []);

  useEffect(() => {
    const getWithdrawals = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/login");
        }
        const userID = userInfoData.SESSID;

        const adminUsername = "ceo";

        const res = await axios.post(
          `${goldwinAPI}/api/withdraw/${userID}/admin-withdrawals`,
          {
            withdrawID: adminUsername,
          }
        );

        if (res.data) {
          setWithdrawalMessages(res.data.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getWithdrawals();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {adminData !== null ? (
        <div className="admin_dashboard">
          <div className="dashboard">
            {window.innerWidth > 768 && <AdminMenu />}
            <AdminHeader />
            <ChristmassLights />
            <div className="welcome admin">
              <div>
                Welcome back, <span>{adminInfo.username}</span>!
              </div>

              <MdWavingHand className="welcomeicon" />
            </div>

            <div className="adminbalance">
              <h2>Admin Balance</h2>
              <div>
                KES{" "}
                {adminInfo.adminBalance !== undefined
                  ? adminInfo.adminBalance
                  : 0}
                .00
              </div>
            </div>
          </div>
          <div className="withdraw_records">
            <p className="withdraw_records_top">
              <MdOutlineReceiptLong className="withdraw_records_icon" />
              Recent history
            </p>

            <div className="withdraw_records_items">
              {withdrawalMessages !== null && withdrawalMessages.length > 0 ? (
                <>
                  {withdrawalMessages.length > 0 &&
                    withdrawalMessages.map((withdrawalMessage, index) => {
                      return (
                        <Fragment key={index + "." + withdrawalMessage._id}>
                          <AdminWithdrawCard
                            withdrawalMessage={withdrawalMessage}
                          />
                        </Fragment>
                      );
                    })}
                </>
              ) : (
                <small>Withdrawals will appear here!</small>
              )}
            </div>
          </div>
          <hr className="adminhr" />

          <div className="adminfooter">
            &copy; {new Date().getFullYear()}, Goldwin Adverts
          </div>
        </div>
      ) : (
        <AdminLogin />
      )}
    </>
  );
};
