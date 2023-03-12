import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { Employee, Task } from "../../types/types";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

interface ITaskList {
  taskList: Task[];
  onDeleteEmployeeHandler: (id: string) => void;
}

const TaskList = ({ taskList, onDeleteEmployeeHandler }: ITaskList) => {
  return (
    <div>
      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            <div>
              <p>{task.title}</p>
              <p>{task.description}</p>

              <p>{task.date.toLocaleString()}</p>
              <Button onClick={() => onDeleteEmployeeHandler(task.id)}>
                Delete
              </Button>
              <Link to={`${task.id}/form`}>
                <Button>Update</Button>
              </Link>
              <Link to={`${task.id}/tasks`}>
                <Button>Tasks</Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
