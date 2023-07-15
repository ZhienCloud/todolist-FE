import React, { useState } from "react";

export default function EditTodoItem({ todo, onSave, onCancel }) {
  const [editedTodo, setEditedTodo] = useState({
    toDoItem: todo.toDoItem,
    details: todo.details,
    deadline: todo.deadline,
    priority: todo.priority,
    repeating: todo.repeating
  });

  const handleTextChange = (e) => {
    setEditedTodo({
      ...editedTodo,
      toDoItem: e.target.value
    });
  };

  const handleDetailsChange = (e) => {
    setEditedTodo({
      ...editedTodo,
      details: e.target.value
    });
  };

  const handleDeadlineChange = (e) => {
    setEditedTodo({
      ...editedTodo,
      deadline: e.target.value
    });
  };

  const handlePriorityChange = (e) => {
    setEditedTodo({
      ...editedTodo,
      priority: e.target.checked
    });
  };

  const handleRepeatingChange = (e) => {
    setEditedTodo({
      ...editedTodo,
      repeating: e.target.checked
    });
  };

  const handleSave = () => {
    onSave(editedTodo);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <label htmlFor="toDoItem">To-Do Item:</label>
      <input
        type="text"
        id="toDoItem"
        value={editedTodo.toDoItem}
        onChange={handleTextChange}
      />
      <label htmlFor="details">Details:</label>
      <input
        type="text"
        id="details"
        value={editedTodo.details}
        onChange={handleDetailsChange}
      />
      <label htmlFor="deadline">Deadline:</label>
      <input
        type="date"
        id="deadline"
        value={editedTodo.deadline}
        onChange={handleDeadlineChange}
        required
      />
      <label htmlFor="priority">Priority:</label>
      <input
        type="checkbox"
        id="priority"
        checked={editedTodo.priority}
        onChange={handlePriorityChange}
      />
      <label htmlFor="repeating">Repeating:</label>
      <input
        type="checkbox"
        id="repeating"
        checked={editedTodo.repeating}
        onChange={handleRepeatingChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
