import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { Employee, Task } from "../../types/types";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const params = useParams();

  const dbRef = ref(getDatabase());
  const db = getDatabase();

  useEffect(() => {
    get(child(dbRef, "employees/" + params.employeeId + "/tasks/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let tasks = snapshot.val();
          const tasksMap = Object.keys(tasks).map(
            (item) => tasks[item]
          );
          setTasks(tasksMap);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tasks]);

  const onDeleteEmployeeHandler = (id: string) => {
    remove(ref(db, "employees/" + params.employeeId + "/tasks/" + id))
      .then(() => {
        // Data saved successfully!
        const updatedEmployees = tasks.filter((task) => task.id !== id);
        setTasks(updatedEmployees);
      })
      .catch((error) => {
        // The write failed...
      });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <p>{task.title}</p>
              <p>{task.description}</p>
              <p>{task.assignee}</p>
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
