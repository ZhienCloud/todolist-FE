import React from "react";

const CompletedTaskButton = ({ todo, onMoveToCompleted }) => {
  const handleMoveToCompleted = () => {
    onMoveToCompleted(todo);
  };

  return (
    <button onClick={handleMoveToCompleted} className="btn btn-secondary">
      Completed
    </button>
  );
};

export default CompletedTaskButton;
