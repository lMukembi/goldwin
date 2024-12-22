import React, { useEffect } from "react";
import { Login } from "./login";
import "../styles/home.css";
import { Header } from "./header";
import { Welcome } from "./welcome";
import { Package } from "./package";
import { Referal } from "./referral";
import { Transactions } from "./transactions";
import { Earnings } from "./earnings";
import { ChristmassLights } from "./christmassLights";
import { Menu } from "./menu";

export const Home = () => {
  const userData = JSON.parse(localStorage.getItem("JSUD"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {userData !== null ? (
        <>
          {window.innerWidth > 768 && <Menu />}
          <div className="homewrapper">
            <Header />
            <ChristmassLights />
            <Welcome />
            <Package />
            <Earnings />
            <Transactions />
            <Referal />

            <hr className="homehr" />

            <div className="homefooter">
              &copy; {new Date().getFullYear()}, Goldwin Adverts
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};
