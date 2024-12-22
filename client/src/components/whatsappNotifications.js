import React, { Fragment, useEffect, useState } from "react";
import "../styles/notifications.css";
import axios from "axios";
import { WhatsappCard } from "./whatsappCard";
import { redirect } from "react-router-dom";

const goldwinAPI = process.env.SERVER_URL;

export const WhatsappNotifications = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  const [whatsappRecords, setWhatsappRecords] = useState([]);

  useEffect(() => {
    const getWhatsappRecords = async () => {
      try {
        if (!userData.SESSID) {
          return redirect("/login");
        }
        const res = await axios.get(
          `${goldwinAPI}/api/whatsapp/${userData.SESSID}/whatsapp-records`
        );
        if (res.data) {
          setWhatsappRecords(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getWhatsappRecords();
  }, [userData.SESSID]);
  return (
    <div>
      {whatsappRecords.length > 0 ? (
        <>
          {whatsappRecords.length > 0 &&
            whatsappRecords.map((whatsappRecord, index) => {
              return (
                <Fragment key={index + "." + whatsappRecord._id}>
                  <WhatsappCard whatsappRecord={whatsappRecord} />
                </Fragment>
              );
            })}
        </>
      ) : (
        <small>Your records will appear here!</small>
      )}
    </div>
  );
};
