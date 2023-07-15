import React from "react";
import axios from "axios";

const DeleteButton = ({ todo, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/toDoItems/${todo.itemId}`);
      if (response && response.status === 200) {
        onDelete(todo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteButton;
