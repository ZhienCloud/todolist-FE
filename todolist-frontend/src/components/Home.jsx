import React from "react";
import { Link } from "react-router-dom";
import NavigationToolbar from "./NavigationToolbar";
import "./CSS/Home.css"; // Import the CSS file for Home component

const Home = () => {
  return (
    <div className="home-container">
      <NavigationToolbar />
      <br/>
      <h1>Welcome to the Home Page!</h1>
      <div className="button-container">
        <Link to="/login" className="button">
          Login
        </Link>
        <Link to="/Register" className="button">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;