import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FiAlignLeft,FiArrowLeftCircle  } from "react-icons/fi";
import Profile from "./Profile";
import Applications from "./Applications";
import Accept from "./Accept";
import Reject from "./Reject";
import { Avatar } from "@mui/material"; // Material UI Avatar for a modern user profile
import { deepOrange, deepPurple } from "@mui/material/colors";
import Logo from "../../public/images/logo.png"; // Adjust the path as necessary
import ChangePassword from "./ChangePassword";
import PageNotFound from "./PageNotFound";
import { jwtDecode } from "jwt-decode";
const Navbar = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userRoleName,setUserRoleName] = useState("");
  const [menuOpen,setMenuOpen] = useState(false)
  useEffect(()=>{
    const storedName = localStorage.getItem('userRoleName');
    if (storedName) {
      setUserRoleName(storedName)
    }
      
  },[])
  // const userRoleName = localStorage.getItem("userRoleName");
  let role = null;
  let isAuthenticated = false;
  if (token && typeof token === "string") {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
      role = decoded.role;
      isAuthenticated = true;
    } catch (err) {
      console.error("Invalid token:", err.message);
    }
  }

  const roleColorMap = {
    operator: "#37b8b4",
    approver: "#06b6d4",
    verifier: "#38BDF8",
    default: "",
  };

  const roleColor = roleColorMap[role] || roleColorMap.default;

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userRoleName");
    navigate("/"); // Navigate to the login page (or homepage)
    window.location.reload();
  };

  return (
    <div className="flex h-fit bg-gray-50 ">
      {/* Left Side: Sidebar */}
      <div>
        {
          menuOpen
          ?
          <FiArrowLeftCircle className="md:hidden text-3xl absolute top-4 left-48"onClick={()=>{setMenuOpen(false)}}/>
          :
          <FiAlignLeft className="md:hidden text-4xl mt-4" onClick={()=>{setMenuOpen(true)}}/>
        }
       
        {/* <FiArrowLeftCircle className="md:hidden text-6xl absolute top-5 "/> */}
      </div>

      <div
        className={`w-60 md:w-[22rem]  min-h-fit text-white p-6 md:flex flex-col items-start shadow-lg border-r border-gray-200 ${menuOpen?'flex':'hidden'}`}
        style={{ backgroundColor: roleColor }}
      >
        {/* Logo and Title */}
        <div className="w-full flex flex-col items-center justify-center mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-32 md:w-52 mb-4 mx-auto pb-2 pt-3"
          />
          <h5 className="text-center text-black">
            Government of Sikkim
            <br />
            I.T Department
          </h5>
          <h3 className="text-2xl font-semibold text-center text-black mx-auto">
            --{props.title}--
          </h3>
        </div>

        {/* User Profile */}
        <div className="w-full flex items-center justify-center mb-6 space-x-4 pb-4 border-b-4 border-black">
          <Avatar sx={{ bgcolor: deepOrange[400] }}>
            {userRoleName ? userRoleName[0] + userRoleName[1]: "I.T"}
          </Avatar>
          <span className="text-lg font-medium text-black">{
          userRoleName?userRoleName:"Department"
          }</span>
        </div>
        {/* Navigation Links */}
        <nav className="w-full flex flex-col space-y-4">
          <Link
            to={`/${role}/profile`}
            className="py-2 text-xl font-medium text-black hover:bg-sky-700 hover:text-white w-full text-center rounded-md transition-all duration-300 noUnderline"
          >
            User Profile
          </Link>
          <Link
            to={`/${role}/applications`}
            className="py-2 text-xl font-medium text-black hover:bg-sky-700 hover:text-white w-full text-center rounded-md transition-all duration-300 noUnderline"
          >
            Applications
          </Link>
          <Link
            to={`/${role}/accept`}
            className="py-2 text-xl font-medium text-black hover:bg-sky-700 hover:text-white w-full text-center rounded-md transition-all duration-300 noUnderline"
          >
            Total Accepted
          </Link>
          <Link
            to={`/${role}/reject`}
            className="py-2 text-xl font-medium text-black hover:bg-sky-700 hover:text-white w-full text-center rounded-md transition-all duration-300 noUnderline"
          >
            Total Rejected
          </Link>
          <Link
            to={`/${role}/changepassword`}
            className="py-2 text-xl font-medium text-black hover:bg-sky-700 hover:text-white w-full text-center rounded-md transition-all duration-300 noUnderline"
          >
            Change Password
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-center transition duration-300 font-bold Rounded"
        >
          Logout
        </button>
      </div>

      {/* Right Side: Main Content */}
      <div className="h-fit flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/accept" element={<Accept />} />
          <Route path="/reject" element={<Reject />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default Navbar;
