// import React, { useEffect } from "react";
// import "../styles/account.css";
// // import { IoPerson, IoChevronBack } from "react-icons/io5";
// import { MdCopyright } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { Header } from "./header";
// import { Taskbar } from "./taskbar";
// import { Settings } from "./settings";

// const Account = () => {
//   const navigate = useNavigate();

//   const userData = JSON.parse(localStorage.getItem("newUser"));

//   function logoutUser() {
//     localStorage.clear();
//     navigate("/");
//   }

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="account">
//       <Header />

//       <div className="accdetails">
//         <div className="accuserinfo">
//           <div>
//             Welcome <span>{userData.result.username},</span>
//           </div>
//           <div>
//             <button onClick={logoutUser}>Logout</button>
//           </div>
//         </div>
//         <Settings />

//         <hr />

//         <div className="footer">
//           <span>Spark Agencies</span>
//           <small>
//             <MdCopyright />
//           </small>
//           <span>2024</span>
//         </div>
//       </div>

//       <Taskbar />
//     </div>
//   );
// };

// export default Account;
