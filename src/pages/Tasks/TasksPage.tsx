import React from "react";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";

const TasksPage = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TasksPage;
