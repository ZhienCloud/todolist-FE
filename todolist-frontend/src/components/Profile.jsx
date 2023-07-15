import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/auth/AuthProvider";
import UserPicture from "../components/UserPicture";
import CreateToDoList from "../components/CreateToDoList";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import TaskList from "./TaskList";
// import "./CSS/Profile.css";

export default function Profile() {
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
        const response = await axios.get("/api/toDoItems/myToDoItems");
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
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
            </div>
          </>
        )}
      </div>
      <div className="profile-right">
        {user && todoList.length > 0 ? (
          <>
            <h3>My Todo List</h3>
            <CreateToDoList todoList={todoList} />
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
}
