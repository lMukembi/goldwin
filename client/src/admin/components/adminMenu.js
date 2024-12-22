import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoPersonAddOutline } from "react-icons/io5";
import { BsPersonPlus } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/menu.css";

export const AdminMenu = () => {
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
        <div className="menuitems">
          <Link to="/369/isAdmin">
            <div className="menuitem">
              <RxDashboard className="menuicon" /> Home
            </div>
          </Link>

          <Link to="/369/add-product">
            <div className="menuitem">
              <GoPlusCircle className="menuicon" /> Add Product
            </div>
          </Link>

          <Link to="/agent/u0BOwVnZ52oj0eW/ceo">
            <div className="menuitem">
              <BsPersonPlus className="menuicon" /> Add Agent
            </div>
          </Link>

          <Link to="/369/upgrade-agent">
            <div className="menuitem">
              <IoPersonAddOutline className="menuicon" />
              Upgrade Agent
            </div>
          </Link>
        </div>

        <button onClick={() => logoutUser()}>Logout</button>
      </div>
    </>
  );
};
