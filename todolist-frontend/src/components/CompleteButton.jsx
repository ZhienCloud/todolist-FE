import React, { useState } from "react";
import axios from "axios";

const CompleteButton = ({ todo, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: true };
      const response = await axios.patch(`/api/toDoItems/${todo.itemId}`, updatedTodo);
      if (response && response.status === 200) {
        setIsComplete(true);
        onComplete(todo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={`complete-button ${isComplete ? "completed" : ""}`}
      onClick={handleComplete}
    >
      Complete
    </button>
  );
};

export default CompleteButton;