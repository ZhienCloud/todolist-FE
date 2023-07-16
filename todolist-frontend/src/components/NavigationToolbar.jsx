import React from "react";
import { Link } from "react-router-dom";
import './CSS/NavigationToolbar.css';

const NavigationToolbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
       
            <li>
              <Link to="/todolist/new">Create To Do List</Link>
            </li>
            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}
       
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationToolbar;