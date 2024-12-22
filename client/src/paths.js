import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { ForgotPassword } from "./components/forgotPassword";
import { Signup } from "./components/signup";
import { Login } from "./components/login";
import { Investments } from "./components/investments";
import { Notifications } from "./components/notifications";
import { Recharge } from "./components/recharge";
import { Transfer } from "./components/transfer";
import { Withdraw } from "./components/withdraw";
import { Tokens } from "./components/tokens";
import { Contact } from "./components/contacts";
import { Team } from "./components/team";
import { Packages } from "./components/packages";
import { Whatsapp } from "./components/whatsapp";
import { Claim } from "./components/claimAgent";
import { NotFound } from "./components/notFound";
import { ResetPassword } from "./components/resetPassword";
import { Loans } from "./components/loans";
import { AdminLogin } from "./admin/components/adminLogin";
import { AdminSignup } from "./admin/components/adminSignup";
import { AdminDashboard } from "./admin/components/adminDashboard";
import { Settings } from "./components/settings";
import { AddProduct } from "./admin/components/addProduct";
import { Agent } from "./components/agent";
import { UpgradeAgent } from "./admin/components/upgradeAgent";

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/369/isAdmin" element={<AdminDashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/369/signup" element={<AdminSignup />} />
      <Route path="/SrBcNEtXZJlucFR/:username" element={<Signup />} />
      <Route path="/agent/u0BOwVnZ52oj0eW/:username" element={<Agent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/369/login" element={<AdminLogin />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/recharge" element={<Recharge />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/whatsapp" element={<Whatsapp />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/loan" element={<Loans />} />
      <Route path="/token" element={<Tokens />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/team" element={<Team />} />
      <Route path="/claim" element={<Claim />} />
      <Route path="/package" element={<Packages />} />
      <Route path="/369/add-product" element={<AddProduct />} />
      <Route path="/369/upgrade-agent" element={<UpgradeAgent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Paths;
