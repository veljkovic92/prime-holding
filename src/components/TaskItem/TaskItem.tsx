import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Task } from "../../types/types";
import Card from "../ui/Card/Card";
import classes from "./TaskItem.module.scss";

interface ITaskItem {
  task: Task;
  onDeleteEmployeeHandler: (id: string) => void;
}

const TaskItem = ({ task, onDeleteEmployeeHandler }: ITaskItem) => {
  return (
    <Card key={task.id} className={classes.taskItem}>
      <div className={classes["taskItem__info"]}>
        <p>
          <strong>Title: </strong>
          {task.title}
        </p>
        <p>
          <strong>Description: </strong>
          {task.description}
        </p>
        <p>
          <strong>Due Date: </strong> {task.date.toLocaleString() || "No limit"}
        </p>
      </div>
      <div className={classes["taskItem__actions"]}>
        <Link to={`${task.id}/form`}>
          <Button variant="success">
            <FiEdit />
          </Button>
        </Link>
        <Button
          onClick={() => onDeleteEmployeeHandler(task.id)}
          variant="danger"
        >
          <AiOutlineDelete />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
