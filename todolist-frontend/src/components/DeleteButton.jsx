import React from "react";

const DeleteButton = ({ todo, onDelete }) => {
  const handleDelete = () => {
    onDelete(todo);
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteButton;