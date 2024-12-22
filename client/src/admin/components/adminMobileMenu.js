import React from "react";
import Logo from "../../assets/images/Logo.png";
import "../../styles/menu.css";
import {
  MdClose,
  MdOutlineArrowDownward,
  MdOutlineWhatsapp,
} from "react-icons/md";
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
import { TbTransferVertical } from "react-icons/tb";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { GoPlusCircle } from "react-icons/go";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPersonPlus, BsPiggyBank } from "react-icons/bs";

export const AdminMobileMenu = ({ close }) => {
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.clear();

    toast.success("Logged out successfully.", {
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
      return navigate("/369/login");
    }, 4000);
  }

  return (
    <>
      <div className="menu">
        <div className="header">
          <Link to="/369/isAdmin">
            <img src={Logo} alt="" />
          </Link>
          <h2>Goldwin Adverts</h2>
          <MdClose className="menugoback" onClick={() => close()} />
        </div>
        <hr />

        <div className="menuitems">
          <Link to="/369/isAdmin" onClick={() => close()}>
            <div className="menuitem">
              <RxDashboard className="menuicon" /> Home
            </div>
          </Link>

          <Link to="/369/add-product">
            <div className="menuitem">
              <GoPlusCircle className="menuicon" /> Add Product
            </div>
          </Link>

          <Link to="/agent/ceo">
            <div className="menuitem">
              <BsPersonPlus className="menuicon" /> Add Agent
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

          <Link to="/whatsapp" onClick={() => close()}>
            <div className="whatsappitems">
              <div className="menuitem">
                <MdOutlineWhatsapp className="menuicon" /> Whatsapp
              </div>
              <span>New</span>
            </div>
          </Link>

          <Link to="/investments" onClick={() => close()}>
            <div className="menuitem">
              <HiMiniArrowTrendingUp className="menuicon" /> Investments
            </div>
          </Link>

          <Link to="">
            <div className="menuitem">
              <BsPiggyBank className="menuicon" /> New Loans
            </div>
          </Link>

          <Link to="/team" onClick={() => close()}>
            <div className="menuitem">
              <IoPeopleOutline className="menuicon" /> Team
            </div>
          </Link>

          <Link to="" onClick={() => close()}>
            <div className="menuitem">
              <PiSpinnerBallLight className="menuicon" /> Spinning
            </div>
          </Link>

          <Link to="">
            <div className="menuitem">
              <PiPencilLineLight className="menuicon" /> Academic
            </div>
          </Link>

          <Link to="/claim" onClick={() => close()}>
            <div className="menuitem">
              <IoPersonAddOutline className="menuicon" />
              Upgrade Agent
            </div>
          </Link>

          <Link to="/package" onClick={() => close()}>
            <div className="menuitem">
              <IoBagHandleOutline className="menuicon" /> Packages
            </div>
          </Link>

          <Link to="/token" onClick={() => close()}>
            <div className="menuitem">
              <PiLockKeyOpen className="menuicon" /> Premium Codes
            </div>
          </Link>

          <Link to="/contact-us" onClick={() => close()}>
            <div className="menuitem">
              <TiContacts className="menuicon" /> Contact Us
            </div>
          </Link>
        </div>

        <button onClick={() => logoutUser()}>Logout</button>
      </div>

      <div onClick={() => close(false)} className="closemenu" />
    </>
  );
};
