import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UpdateTaskForm from "../../components/UpdateTaskForm/UpdateTaskForm";
import { Employee, Task } from "../../types/types";

const UpdateTaskPage = () => {
  const params = useParams();
  const employeeId = params.employeeId;
  const taskId = params.taskId;

  const dbRef = ref(getDatabase());

  const [matchingTaskTitle, setMatchingTaskTitle] = useState("");

  const handleMatchingTaskTitle = (title: string) => {
    setMatchingTaskTitle(title);
  };

  const [matchingEmployee, setMatchingEmployee] = useState<Employee>();
  const [matchingTask, setMatchingTask] = useState<Task>();

  const getEmployeeData = () => {
    get(child(dbRef, `employees/${employeeId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let matchingEmployee = snapshot.val();

          setMatchingEmployee(matchingEmployee);
        } else {
          console.log("No data available");
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
          console.log("No data available");
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
    <div>
      <h2>Update Your Task</h2>
      <p>Task Title: {matchingTaskTitle}</p>
      <p>Employee Name: {matchingEmployee?.name}</p>
      <UpdateTaskForm
        matchingTask={matchingTask}
        onMatchingTaskTitle={handleMatchingTaskTitle}
      />
    </div>
  );
};

export default UpdateTaskPage;
