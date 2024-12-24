import React, { useEffect, useState } from "react";
import "../../styles/header.css";
import Logo from "../../assets/images/Logo.png";
import Boss from "../../assets/images/Boss.jpeg";
import { RiMenuAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbSettingsPlus } from "react-icons/tb";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import { AdminMobileMenu } from "./adminMobileMenu";

const goldwinAPI = "https://api.goldwinadverts.com";

export const AdminHeader = () => {
  const [menu, setMenu] = useState(false);

  const [whatsappRecords, setWhatsappRecords] = useState([]);
  const [transferMessages, setTransferMessages] = useState([]);
  const [receiverMessages, setReceiverMessages] = useState([]);
  const [transactionMessages, setTransactionMessages] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/369/login");
        }
        const userID = userInfoData.SESSID;

        const res = await axios.get(
          `${goldwinAPI}/api/sasaPay/${userID}/transaction-messages`
        );
        if (res.data) {
          setTransactionMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTransactions();
  }, []);

  useEffect(() => {
    const getWhatsappRecords = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/369/login");
        }
        const userID = userInfoData.SESSID;

        const res = await axios.get(
          `${goldwinAPI}/api/whatsapp/${userID}/whatsapp-records`
        );
        if (res.data) {
          setWhatsappRecords(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getWhatsappRecords();
  }, []);

  useEffect(() => {
    const getTransferMessages = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/369/login");
        }
        const userID = userInfoData.SESSID;

        const res = await axios.get(
          `${goldwinAPI}/api/transfer/${userID}/transfer-messages`
        );
        if (res.data) {
          setTransferMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTransferMessages();
  }, []);

  useEffect(() => {
    const getReceiverMessages = async () => {
      try {
        const userInfoData = JSON.parse(localStorage.getItem("JSUD"));
        if (!userInfoData) {
          return redirect("/369/login");
        }
        const userID = userInfoData.SESSID;

        const res = await axios.get(
          `${goldwinAPI}/api/receiver/${userID}/receiver-messages`
        );
        if (res.data) {
          setReceiverMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getReceiverMessages();
  }, []);

  return (
    <>
      <div className="headwrapper">
        <div className="head">
          {window.innerWidth < 768 && (
            <>
              <Link to="/369/isAdmin">
                <img src={Logo} alt="" />
              </Link>

              <div>
                <RiMenuAddLine
                  onClick={() => setMenu(!menu)}
                  className="icon menuicon"
                />
                {menu && <AdminMobileMenu close={setMenu} />}
              </div>

              <div>
                <Link to="/notifications">
                  <IoMdNotificationsOutline className="icon" />
                  <sup className="notsup">
                    {transactionMessages.length +
                      whatsappRecords.length +
                      transferMessages.length +
                      receiverMessages.length}
                  </sup>
                </Link>
              </div>

              <div>
                <Link to="">
                  <TbSettingsPlus className="icon" />
                </Link>
              </div>
              <img src={Boss} alt="" />
            </>
          )}

          {/* DESKTOP */}

          {window.innerWidth > 768 && (
            <>
              <div className="logo">
                <Link to="/369/isAdmin">
                  <img src={Logo} alt="" />
                </Link>
                <span>Goldwin Adverts</span>
              </div>

              <div className="headinfo">
                <div>
                  <Link to="/notifications">
                    <IoMdNotificationsOutline className="icon" />
                    <sup className="notsup">
                      {transactionMessages.length +
                        whatsappRecords.length +
                        transferMessages.length +
                        receiverMessages.length}
                    </sup>
                  </Link>
                </div>

                <div>
                  <Link to="/settings">
                    <TbSettingsPlus className="icon" />
                  </Link>
                </div>
                <img src={Boss} alt="" />
              </div>
            </>
          )}
        </div>
      </div>
      <hr className="headhr" />
    </>
  );
};
