import React from "react";
import { Link } from "react-router-dom";
import './CSS/NavigationToolbar.css';
import logo from "./CSS/Images/To-Do-List Logo.gif"

const NavigationToolbar = () => {
  return (
    <nav className="navbar">
       <img
        className="logo"
        src={logo}
        alt="To-Do List Logo"
      />
      <h2 className="AppName">ToDoList</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
       
            <li>
              <Link to="/todolist/new">Create ToDoList</Link>
            </li>
            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}
       
        {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
      </ul>
     
    </nav>
  );
};

export default NavigationToolbar;