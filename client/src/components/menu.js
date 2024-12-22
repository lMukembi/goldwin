import React from "react";
import "../styles/menu.css";
import { MdOutlineArrowDownward, MdOutlineWhatsapp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TiContacts } from "react-icons/ti";
import {
  PiHandDeposit,
  PiLockKeyOpen,
  PiPencilLineLight,
  PiSpinnerBallLight,
} from "react-icons/pi";
import {
  IoPeopleOutline,
  IoPersonAddOutline,
  IoBagHandleOutline,
} from "react-icons/io5";
import { BsPiggyBank } from "react-icons/bs";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbTransferVertical } from "react-icons/tb";

export const Menu = () => {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.clear();

    toast.success("You logged out successfully.", {
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

  return (
    <>
      <div className="menu">
        <div className="menuitems">
          <Link to="/">
            <div className="menuitem">
              <RxDashboard className="menuicon" /> Home
            </div>
          </Link>

          <Link to="/recharge">
            <div className="menuitem">
              <PiHandDeposit className="menuicon" /> Recharge
            </div>
          </Link>

          <Link to="/transfer">
            <div className="menuitem">
              <TbTransferVertical className="menuicon" /> Transfer
            </div>
          </Link>

          <Link to="/withdraw">
            <div className="menuitem">
              <MdOutlineArrowDownward className="menuicon" /> Withdraw
            </div>
          </Link>

          <Link to="/whatsapp">
            <div className="whatsappitems">
              <div className="menuitem">
                <MdOutlineWhatsapp className="menuicon" /> Whatsapp
              </div>
              <span>New</span>
            </div>
          </Link>

          <Link to="/investments">
            <div className="menuitem">
              <HiMiniArrowTrendingUp className="menuicon" /> Investments
            </div>
          </Link>

          <Link to="">
            <div className="menuitem">
              <BsPiggyBank className="menuicon" /> New Loans
            </div>
          </Link>

          <Link to="/team">
            <div className="menuitem">
              <IoPeopleOutline className="menuicon" /> Team
            </div>
          </Link>

          <Link to="">
            <div className="menuitem">
              <PiSpinnerBallLight className="menuicon" /> Spinning
            </div>
          </Link>

          <Link to="">
            <div className="menuitem">
              <PiPencilLineLight className="menuicon" /> Academic
            </div>
          </Link>

          <Link to="/claim">
            <div className="menuitem">
              <IoPersonAddOutline className="menuicon" />
              Claim Agent
            </div>
          </Link>

          <Link to="/package">
            <div className="menuitem">
              <IoBagHandleOutline className="menuicon" /> Packages
            </div>
          </Link>

          <Link to="/token">
            <div className="menuitem">
              <PiLockKeyOpen className="menuicon" /> Premium Codes
            </div>
          </Link>

          <Link to="/contact-us">
            <div className="menuitem">
              <TiContacts className="menuicon" /> Contact Us
            </div>
          </Link>
        </div>

        <button onClick={() => logoutUser()}>Logout</button>
      </div>
    </>
  );
};
