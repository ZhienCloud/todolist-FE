import React from "react";

const CompleteButton = ({ onClick }) => {
  return (
    <button className="complete-button" onClick={onClick}>Complete</button>
  );
};

export default CompleteButton;