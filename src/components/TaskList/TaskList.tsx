import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { Employee, Task } from "../../types/types";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TaskItem from "../TaskItem/TaskItem";
import classes from "./TaskList.module.scss"

interface ITaskList {
  taskList: Task[];
  onDeleteEmployeeHandler: (id: string) => void;
}

const TaskList = ({ taskList, onDeleteEmployeeHandler }: ITaskList) => {
  return (
    <div className={classes.taskList}>
      <h3>All Employee Tasks</h3>
      <ul>
        {taskList.map((task) => (
          <TaskItem task={task} onDeleteEmployeeHandler={onDeleteEmployeeHandler}/>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
