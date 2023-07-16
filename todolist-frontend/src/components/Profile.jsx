import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../components/auth/AuthProvider";
import UserPicture from "../components/UserPicture";
import CreateToDoList from "../components/CreateToDoList";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./CSS/Profile.css";

const Profile = () => {
  const { logoutSuccess, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.user;

  const [todoList, setTodoList] = useState([]);

  const handleCreateTodoList = () => {
    navigate("/todolist/new");
  };

  const handleAddToList = () => {
    // Handle add to list functionality here
  };

  useEffect(() => {
    // Fetch user's to-do list
    const fetchTodoList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/toDoItems/myToDoItems");
        setTodoList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoList();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-left">
        {user && (
          <>
            <UserPicture user={user} />
            <div className="bio-details">
              <h2>User ID: {user.id}</h2>
              <h2>Name: {user.username}</h2>
              <h2>Email: {user.email}</h2>
            </div>
          </>
        )}
      </div>
      <div className="profile-right">
        {user && todoList.length > 0 ? (
          <>
            <h3>My Todo List</h3>
            <div className="to-do">
              <h2>Todo List:</h2>
              <ul>
                {todoList.map((todo) => (
                  <li key={todo._id || todo.id}>
                    <p>To-Do Item: {todo.toDoItem}</p>
                    <p>Details: {todo.details}</p>
                    <p>Deadline: {todo.deadline}</p>
                    <p>Priority: {todo.priority ? "Yes" : "No"}</p>
                    <p>Repeating: {todo.repeating ? "Yes" : "No"}</p>
                  </li>
                ))}
              </ul>
            </div>
            <button className="btn btn-primary" onClick={handleAddToList}>
              Add to List
            </button>
          </>
        ) : (
          <div className="no-list">
            <p>No to-do list found.</p>
            <button className="btn btn-primary" onClick={handleCreateTodoList}>
              <Link to="/create-todo-list" className="button">
                Create To Do List
              </Link>
            </button>
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={logoutSuccess}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
