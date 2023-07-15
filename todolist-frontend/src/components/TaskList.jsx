import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>{task.toDoItem}</li>
      ))}
    </ul>
  );
};

export default TaskList;