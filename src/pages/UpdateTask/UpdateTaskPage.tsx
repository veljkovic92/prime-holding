import { child, get, getDatabase, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import UpdateTaskForm from "../../components/UpdateTaskForm/UpdateTaskForm";
import { Employee, Task } from "../../types/types";
import classes from "./UpdateTaskPage.module.scss";

const UpdateTaskPage = () => {
  const params = useParams();
  const employeeId = params.employeeId;
  const taskId = params.taskId;

  const dbRef = ref(getDatabase());

  const [matchingEmployee, setMatchingEmployee] = useState<Employee>();
  const [matchingTask, setMatchingTask] = useState<Task>();

  const getEmployeeData = useCallback(() => {
    get(child(dbRef, `employees/${employeeId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let matchingEmployee = snapshot.val();

          setMatchingEmployee(matchingEmployee);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef, employeeId]);

  const getTaskData = useCallback(() => {
    get(child(dbRef, `employees/${employeeId}/tasks/${taskId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let matchingTask = snapshot.val();

          setMatchingTask(matchingTask);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef, employeeId, taskId]);

  useEffect(() => {
    getEmployeeData();
  }, [getEmployeeData]);

  useEffect(() => {
    getTaskData();
  }, [getTaskData]);

  return (
    <div className={classes.updateTaskPage}>
      <h2 className={classes["updateTaskPage__title"]}>Edit Task</h2>
      <h4 className={classes["updateTaskPage__name"]}>
        <em>
          {matchingEmployee?.name}'s
          <strong> {matchingTask?.title} </strong>
          task
        </em>
      </h4>
      <UpdateTaskForm matchingTask={matchingTask} />
    </div>
  );
};

export default UpdateTaskPage;
