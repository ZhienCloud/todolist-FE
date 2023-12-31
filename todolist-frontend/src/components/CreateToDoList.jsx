import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/CreateToDoList.css";
import CompleteButton from "./CompleteButton";
import DeleteButton from "./DeleteButton";
import EditTodoItem from "./EditTodoItem";
import LogoutButton from "./LogoutButton";


const CreateToDoList = () => {
  const [newTodo, setNewTodo] = useState({
    toDoItem: "",
    details: "",
    createdBy: "",
    assignedTo: [],
    deadline: null,
    priority: "",
    repeating: false,
  });
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTodoList();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(process.env.REACT_APP_API_USERS, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTodoList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_CREATE}/${user.id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }});
      if (response && response.status === 200 && response.data) {
        const updatedList = response.data.filter(
          (todo) => !todo.deleted // Exclude the deleted todos
        );
        const sortedList = updatedList.sort((a, b) => a.priority - b.priority);
        setTodoList(updatedList);
        setTodoList(sortedList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
  
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: updatedValue,
    }));

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(process.env.REACT_APP_API_TODOITEMS,
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      setSubmittedTodo(response.data);
      fetchTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    setEditingTodoId(id);
  };

  const handleSave = async (id, updatedTodo) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${process.env.REACT_APP_API_TODOITEMS}/${id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      setEditingTodoId(null);
      fetchTodoList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_API_TODOITEMS}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
    

  const handleComplete = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${process.env.REACT_APP_API_TODOITEMS_CLOSE}/${id}`, null, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleCancel = () => {
    setEditingTodoId(null);
  };
  console.log(newTodo);


  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <label>
          To-Do Item:
          <input
            type="text"
            name="toDoItem"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Details:
          <input type="text" name="details" onChange={handleChange} />
        </label>
        <label>
          Deadline:
          <input type="date" name="deadline" onChange={handleChange} required />
        </label>
        <label>
          Priority:
          <select
            name="priority"
            value={newTodo.priority}
            onChange={handleChange}
          >
            <option value="">Select a priority</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Repeating:
          <input
  type="checkbox"
  name="repeating"
  checked={newTodo.repeating}
  onChange={handleChange}
/>

        </label>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>

      <div className="to-do">
        <h2>Todo List:</h2>
        <ul>
          {todoList.map((todo) => (
            <li key={todo._id || todo.id}>
              {editingTodoId === (todo._id || todo.id) ? (
                <EditTodoItem
                  todo={todo}
                  onSave={(updatedTodo) => handleSave(todo._id, updatedTodo)}
                  onCancel={handleCancel}
                />
              ) : (
                <>
                  <p>To-Do Item: {todo.toDoItem}</p>
                  <p>Details: {todo.details}</p>
                  {/* <p>CreatedBy: {todo.createdBy}</p> */}
                  <p>Deadline: {new Date(todo.deadline).toLocaleDateString()}</p>
                  <p>Priority: {todo.priority}</p>
                  <p>Repeating: {String(todo.repeating)}</p>
                  <button className="edit-button" onClick={() => handleEdit(todo._id || todo.id)}>Edit</button>
                </>
              )}
              <DeleteButton className="btn btn-danger" onClick={() => handleDelete(todo._id || todo.id)} />
              <CompleteButton className="btn btn-success" onClick={() => handleComplete(todo._id || todo.id)} />
            </li>
          ))}
        </ul>
      </div>
      <LogoutButton className="btn btn-danger" />
    </div>
  );
};

export default CreateToDoList;
