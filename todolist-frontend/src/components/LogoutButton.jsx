import React, { useContext } from "react";
import { AuthContext } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./CSS/CreateToDoList.css";


const LogoutButton = () => {
  const { logoutSuccess } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the JWT token from the browser
    localStorage.removeItem("token");

    // Call the logoutSuccess function from the AuthContext
    logoutSuccess();
    navigate("/");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
