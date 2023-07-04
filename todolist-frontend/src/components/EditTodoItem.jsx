import React, { useState } from "react";

export default function EditTodoItem({ todo, onSave, onCancel }) {
  const [text, setText] = useState(todo.text);
  const [assignee, setAssignee] = useState(todo.assignee);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleSave = () => {
    onSave({ ...todo, text, assignee });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <label htmlFor="text">Task:</label>
      <input type="text" id="text" value={text} onChange={handleTextChange} />
      <label htmlFor="assignee">Assignee:</label>
      <input
        type="text"
        id="assignee"
        value={assignee}
        onChange={handleAssigneeChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
