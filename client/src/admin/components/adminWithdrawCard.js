import React, { useState } from "react";
import "../../styles/notifications.css";
import { CiReceipt } from "react-icons/ci";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const goldwinAPI = "https://api.goldwinadverts.com";

export const AdminWithdrawCard = ({ withdrawalMessage }) => {
  const [value, setValue] = useState("");

  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  const updateStatus = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${goldwinAPI}/api/withdraw/update-status`, {
        status: value,
        statusID: withdrawalMessage._id,
      });

      if (res.data) {
        toast.success("Payment updated successfully.", {
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

  return (
    <div className="notification_card_details">
      <div className="notification_card_top">
        <CiReceipt className="notification_card_icon" />
        <div>
          <div className="notification_card_text">New withdrawal</div>
          <div className="notification_card_time">
            {new Date(withdrawalMessage.createdAt).toLocaleString()}
          </div>
          <div>{withdrawalMessage.phone}</div>
        </div>
      </div>
      <div>
        <div>
          <div className="notification_card_amt">
            {withdrawalMessage.amount} KES
          </div>
          <div className="notification_card_time confirm">
            {withdrawalMessage.status}
            <div className="dropdown">
              <select onChange={handleSelect}>
                <option value={""}>Change Status</option>
                <option value={"Pending"}>Pending</option>
                <option value={"Paid"}>Paid</option>
                <option value={"Declined"}>Declined</option>
              </select>
            </div>

            <button onClick={updateStatus}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};
