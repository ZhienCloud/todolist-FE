import React, { useState } from "react";
import axios from "axios";
import './CSS/CreateToDoList.css';

const CreateToDoList = () => {
  const [todoText, setTodoText] = useState("");
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [repeating, setRepeating] = useState("");
  const [assignee, setAssignee] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleRepeatingChange = (e) => {
    setRepeating(e.target.value);
  };

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (todoText.trim() !== "") {
      const newTodo = {
        toDoItem: todoText,
        details: details,
        deadline: deadline,
        status: status,
        priority: priority,
        repeating: repeating,
        assignedTo: assignee || "Unassigned",
      };

      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await axios.post("http://localhost:3000/api/toDoItems", newTodo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response && response.status === 201 && response.data) {
          const addedTodo = response.data;
          setTodoList([...todoList, addedTodo]);
          setTodoText("");
          setDetails("");
          setDeadline("");
          setStatus("");
          setPriority("");
          setRepeating("");
          setAssignee("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="box">
      <div className="container">
        <h2 className="title">To-Do List</h2>

        <form onSubmit={handleAddTodo}>
          <div className="mb-3">
            <label htmlFor="todo" className="form-label">
              Task
            </label>
            <input
              type="text"
              className="form-control"
              id="todo"
              name="todo"
              value={todoText}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Details
            </label>
            <input
              type="text"
              className="form-control"
              id="details"
              name="details"
              value={details}
              onChange={handleDetailsChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">
              Deadline
            </label>
            <input
              type="text"
              className="form-control"
              id="deadline"
              name="deadline"
              value={deadline}
              onChange={handleDeadlineChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <input
              type="text"
              className="form-control"
              id="priority"
              name="priority"
              value={priority}
              onChange={handlePriorityChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repeating" className="form-label">
              Repeating
            </label>
            <input
              type="text"
              className="form-control"
              id="repeating"
              name="repeating"
              value={repeating}
              onChange={handleRepeatingChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="assignee" className="form-label">
              Assignee
            </label>
            <input
              type="text"
              className="form-control"
              id="assignee"
              name="assignee"
              value={assignee}
              onChange={handleAssigneeChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>
      </div>

      {/* Rest of the code */}
    </div>
  );
};

export default CreateToDoList;
