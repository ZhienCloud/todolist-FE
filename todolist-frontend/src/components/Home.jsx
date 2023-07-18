import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationToolbar from "./NavigationToolbar";
import "./CSS/Home.css"; // Import the CSS file for Home component
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/users/info", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <NavigationToolbar />
      <br/>
      <h1>Welcome to the Home Page!</h1>
      <div className="button-container">
        {
          user ? (
            <div>
              {/* <h2>User ID: {user.id}</h2> */}
              <h2>Name: {user.username}</h2>
              <h2>Email: {user.email}</h2>
            </div>
          ) : (
            <>
              <Link to="/login" className="button">
                Login
              </Link>
              <Link to="/Register" className="button">
                Register
              </Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Home;
