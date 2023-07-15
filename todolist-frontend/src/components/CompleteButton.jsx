import React, { useState } from "react";

const CompleteButton = ({ todo, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    onComplete(todo);
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