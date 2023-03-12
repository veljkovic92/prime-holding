import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { Employee, Task } from "../../types/types";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TaskItem from "../TaskItem/TaskItem";
import classes from "./TaskList.module.scss";

interface ITaskList {
  taskList: Task[];
  onDeleteTaskHandler: (id: string) => void;
  onDoneTaskHandler: (id: string) => void;
  onNotDoneTaskHandler: (id: string) => void;
}

const TaskList = ({
  taskList,
  onDeleteTaskHandler,
  onDoneTaskHandler,
  onNotDoneTaskHandler,
}: ITaskList) => {
  return (
    <div className={classes.taskList}>
      {taskList.length === 0 && <h3>No Tasks Yet...</h3>}
      {taskList.length > 0 && (
        <>
          <h3 className={classes["taskList__title"]}>Assigned to:</h3>
          <ul className={classes["taskList__list"]}>
            {taskList.map((task) => (
              <TaskItem
                task={task}
                onDeleteTaskHandler={onDeleteTaskHandler}
                onDoneTaskHandler={onDoneTaskHandler}
                onNotDoneTaskHandler={onNotDoneTaskHandler}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskList;
