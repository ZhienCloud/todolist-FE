import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/CreateToDoList.css";
import CompleteButton from "./CompleteButton";
import DeleteButton from "./DeleteButton";
import EditTodoItem from "./EditTodoItem";

const CreateToDoList = () => {
  const [newTodo, setNewTodo] = useState({
    toDoItem: "",
    details: "",
    createdBy: "",
    assignedTo: [],
    deadline: null,
    priority: false,
    repeating: false
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

  const fetchTodoList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/toDoItems", {
        params: { createdBy: user._id }
      });
      if (response && response.status === 200 && response.data) {
        const updatedList = response.data.filter(
          (todo) => !todo.deleted // Exclude the deleted todos
        );
        setTodoList(updatedList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setNewTodo({
      ...newTodo,
      [name]: updatedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/toDoItems",
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
      const response = await axios.patch(
        `http://localhost:3000/api/toDoItems/${id}`,
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
      await axios.delete(`http://localhost:3000/api/toDoItems/${id}`, {
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
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/api/toDoItems/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTodoList(todoList.filter((todo) => todo._id !== id));
      } else {
        console.log("Failed to delete the item.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditingTodoId(null);
  };

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
          <input
            type="checkbox"
            name="priority"
            checked={newTodo.priority}
            onChange={handleChange}
          />
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
        <input type="submit" value="Submit" />
      </form>

      <div>
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
                  <p>Deadline: {todo.deadline}</p>
                  <p>Priority: {todo.priority ? "Yes" : "No"}</p>
                  <p>Repeating: {todo.repeating ? "Yes" : "No"}</p>
                  <button onClick={() => handleEdit(todo._id || todo.id)}>Edit</button>
                </>
              )}
              <DeleteButton onClick={() => handleDelete(todo._id || todo.id)} />
              <CompleteButton onClick={() => handleComplete(todo._id || todo.id)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateToDoList;
