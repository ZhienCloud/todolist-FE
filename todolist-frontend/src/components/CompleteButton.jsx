import React from "react";



const CompleteButton = ({ id, onClick }) => {
  const handleComplete = () => {
    console.log(id);
    onClick(id);
  };

  return <button className="complete-button" onClick={handleComplete}>Complete</button>;
};

export default CompleteButton;



