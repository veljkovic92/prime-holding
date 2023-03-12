import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
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

  const getEmployeeData = () => {
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
  };

  const getTaskData = () => {
    get(child(dbRef, `employees/${employeeId}/` + "tasks/" + taskId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let matchingTask = snapshot.val();

          setMatchingTask(matchingTask);

          // onMatchingTaskTitle(matchingTask.title);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  useEffect(() => {
    getTaskData();
  }, []);

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
