import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Task } from "../../types/types";
import Card from "../ui/Card/Card";
import classes from "./TaskItem.module.scss"

interface ITaskItem {
  task: Task;
  onDeleteEmployeeHandler: (id: string) => void;
}

const TaskItem = ({ task, onDeleteEmployeeHandler }: ITaskItem) => {
  return (
    <Card key={task.id} className={classes.taskItem}>
      <div>
        <p>Title: {task.title}</p>
        <p>Description: {task.description}</p>
        <p>{task.date.toLocaleString()}</p>
        </div>
        <div className={classes["taskItem__actions"]}>
        <Button onClick={() => onDeleteEmployeeHandler(task.id)}>Delete</Button>
        <Link to={`${task.id}/form`}>
          <Button>Update</Button>
        </Link>
        <Link to={`${task.id}/tasks`}>
          <Button>Tasks</Button>
        </Link>
      </div>
    </Card>
  );
};

export default TaskItem;
