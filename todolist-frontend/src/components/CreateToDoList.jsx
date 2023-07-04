import React, { useState } from "react";
import EditTodoItem from "./EditTodoItem";
import AssignTodoItem from "./AssignToDoList";
import CompletedTaskButton from "./CompletedTaskButton";
import './CSS/CreateToDoList.css';

export default function CreateToDoList() {
  const [todoText, setTodoText] = useState("");
  const [assignee, setAssignee] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [assigningTodoId, setAssigningTodoId] = useState(null);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (todoText.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: todoText,
        assignee: assignee || "Unassigned",
      };

      setTodoList([...todoList, newTodo]);
      setTodoText("");
      setAssignee("");
    }
  };

  const handleEdit = (todoId) => {
    setEditingTodoId(todoId);
  };

  const handleSave = (editedTodo) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return editedTodo;
      }
      return todo;
    });
    setTodoList(updatedTodoList);
    setEditingTodoId(null);
  };

  const handleCancel = () => {
    setEditingTodoId(null);
  };

  const handleMoveToCompleted = (todo) => {
    const updatedTodoList = todoList.filter((item) => item.id !== todo.id);
    setTodoList(updatedTodoList);
  };

  const handleAssignSave = (assignedTodo) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === assignedTodo.id) {
        return assignedTodo;
      }
      return todo;
    });
    setTodoList(updatedTodoList);
    setAssigningTodoId(null);
  };

  const handleAssignCancel = () => {
    setAssigningTodoId(null);
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

      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingTodoId === todo.id ? (
              <EditTodoItem
                todo={todo}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <div>
                {todo.text} (Assignee: {todo.assignee})
                {assigningTodoId === todo.id && (
                  <AssignTodoItem
                    todo={todo}
                    onSave={handleAssignSave}
                    onCancel={handleAssignCancel}
                  />
                )}
                <button
                  className="edit-button"
                  onClick={() => handleEdit(todo.id)}
                >
                  Edit
                </button>
                <CompletedTaskButton className="edit-button"
         todo={todo}
         onMoveToCompleted={handleMoveToCompleted}
      />
          
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  
  );
}
