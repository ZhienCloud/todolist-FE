import React, { useState } from "react";
import axios from "axios";
import './CSS/CreateToDoList.css'; // Import your CSS

const CreateToDoList = () => {
    const [newTodo, setNewTodo] = useState({
        toDoItem: "",
        details: "",
        assignedTo: [],
        deadline: null,
        priority: "",
        repeating: ""
    });

    const handleChange = e => {
        setNewTodo({
            ...newTodo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:3000/api/toDoItems", newTodo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <label>
                To-Do Item:
                <input type="text" name="toDoItem" onChange={handleChange} required />
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
                <input type="text" name="priority" onChange={handleChange} />
            </label>
            <label>
                Repeating:
                <input type="text" name="repeating" onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default CreateToDoList;
