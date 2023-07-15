import React from "react";

const DeleteButton = ({ itemId, onClick }) => {
  const handleDelete = () => {
    onClick(itemId);
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;