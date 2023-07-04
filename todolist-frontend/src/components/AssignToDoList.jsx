import React, { useState } from "react";

export default function AssignTodoItem({ todo, onSave, onCancel }) {
  const [assignee, setAssignee] = useState(todo.assignee);

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleSave = () => {
    onSave({ ...todo, assignee });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <label htmlFor="assignee">Assign:</label>
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
