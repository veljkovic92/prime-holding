import React, { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";
import { Employee, Task } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { useParams } from "react-router";
import app from "../../firebase/firebase";
import classes from "./TasksPage.module.scss";

const TasksPage = () => {
  const params = useParams();
  const db = getDatabase(app);
  const dbRef = ref(getDatabase());
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [matchingEmployee, setMatchingEmployee] = useState<Employee>();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    get(child(dbRef, `employees/${params.employeeId}/tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const tasks = snapshot.val();
          const tasksMap = Object.keys(tasks).map((item) => tasks[item]);

          setTaskList(tasksMap);
        } else {
          setTaskList([]);
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    get(child(dbRef, `employees/${params.employeeId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const employee = snapshot.val();

          setMatchingEmployee(employee);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onRegisterFormSubmit = async (data: Task) => {
    const { title, description, date } = data;
    const id = uuidv4();

    await set(ref(db, "employees/" + params.employeeId + "/tasks/" + id), {
      id,
      title,
      description,
      date,
    });

    getData();
  };

  const onDeleteEmployeeHandler = async (id: string) => {
    await remove(ref(db, "employees/" + params.employeeId + "/tasks/" + id));
    getData();
  };

  return (
    <div className={classes.tasksPage}>
      <h2>Tasks</h2>
      <h5>
        Employee: <em>{matchingEmployee?.name}</em>
      </h5>
      <TaskForm onRegisterFormSubmit={onRegisterFormSubmit} />
      <TaskList
        taskList={taskList}
        onDeleteEmployeeHandler={onDeleteEmployeeHandler}
      />
    </div>
  );
};

export default TasksPage;
