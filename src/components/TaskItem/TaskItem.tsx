import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheck2Square } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Task } from "../../types/types";
import Card from "../ui/Card/Card";
import classes from "./TaskItem.module.scss";

interface ITaskItem {
  task: Task;
  onDeleteTaskHandler: (id: string) => void;
  onDoneTaskHandler: (id: string) => void;
  onNotDoneTaskHandler: (id: string) => void;
}

const TaskItem = ({
  task,
  onDeleteTaskHandler,
  onDoneTaskHandler,
  onNotDoneTaskHandler,
}: ITaskItem) => {
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
        <p>
          <strong>Completed?</strong> {task.completed === false ? "No" : "Yes"}
        </p>
      </div>
      <div className={classes["taskItem__actions"]}>
        {task.completed !== true && (
          <Button onClick={() => onDoneTaskHandler(task.id)} variant="success">
            <BsCheck2Square />
          </Button>
        )}

        {task.completed === true && (
          <Button onClick={() => onNotDoneTaskHandler(task.id)} variant="danger">
            <CiSquareRemove />
          </Button>
        )}
        <Link to={`${task.id}/form`}>
          <Button variant="warning">
            <FiEdit />
          </Button>
        </Link>
        <Button onClick={() => onDeleteTaskHandler(task.id)} variant="danger">
          <AiOutlineDelete />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
