import { useCallback, useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";
import { Employee, NotificationType, Task } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { useParams } from "react-router";
import app from "../../firebase/firebase";
import classes from "./TasksPage.module.scss";
import { Button } from "react-bootstrap";
import Notification from "../../components/Notification/Notification";

const TasksPage = () => {
  const params = useParams();
  const db = getDatabase(app);
  const dbRef = ref(getDatabase());
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [matchingEmployee, setMatchingEmployee] = useState<Employee>();
  const [newTaskClicked, setNewTaskClicked] = useState(false);
  const employeeId = params.employeeId;

  const emptyNotification: NotificationType = {
    status: "",
    title: "",
    message: "",
  };

  const [notification, setNotification] =
    useState<NotificationType>(emptyNotification);

  const getData = useCallback(() => {
    get(child(dbRef, `employees/${employeeId}/tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const tasks = snapshot.val();
          const tasksMap = Object.keys(tasks).map((item) => tasks[item]);

          setTaskList(tasksMap);
        } else {
          setTaskList([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    get(child(dbRef, `employees/${employeeId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const employee = snapshot.val();

          setMatchingEmployee(employee);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef, employeeId]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (notification.status !== "") {
      setTimeout(() => {
        setNotification(emptyNotification);
      }, 2000);
    }
  }, [notification]);

  const onRegisterFormSubmit = async (data: Task) => {
    const { title, description, date, completed } = data;
    const id = uuidv4();
    try {
      await set(ref(db, "employees/" + params.employeeId + "/tasks/" + id), {
        id,
        title,
        description,
        date,
        completed,
      });
      setNotification({
        status: "success",
        title: "Task save complete!",
        message: "Successfully stored task to the list",
      });
      getData();
      setNewTaskClicked(false);
    } catch (err) {
      setNotification({
        status: "failure",
        title: "Task save incomplete!",
        message: "Failed storing task to the list",
      });
    }
  };

  const onDeleteTaskHandler = async (id: string) => {
    try {
      await remove(ref(db, "employees/" + params.employeeId + "/tasks/" + id));
      setNotification({
        status: "success",
        title: "Task delete complete!",
        message: "Successfully removed task from the list",
      });
      getData();
    } catch (err) {
      setNotification({
        status: "failure",
        title: "Task delete incomplete!",
        message: "Failed removing task from the list",
      });
    }
  };

  const onDoneTaskHandler = async (id: string) => {
    try {
      await set(
        ref(
          db,
          "employees/" + params.employeeId + "/tasks/" + id + "/completed/"
        ),
        true
      );
      setNotification({
        status: "success",
        title: "Task edit complete!",
        message: "Successfully marked task as complete",
      });
      getData();
    } catch (err) {
      setNotification({
        status: "failure",
        title: "Task edit incomplete!",
        message: "Failed marking task as complete",
      });
    }
  };

  const onNotDoneTaskHandler = async (id: string) => {
    try {
      await set(
        ref(
          db,
          "employees/" + params.employeeId + "/tasks/" + id + "/completed/"
        ),
        false
      );
      setNotification({
        status: "success",
        title: "Task edit complete!",
        message: "Successfully marked task as incomplete",
      });
      getData();
    } catch (err) {
      setNotification({
        status: "failure",
        title: "Task edit incomplete!",
        message: "Failed marking task as incomplete",
      });
    }
  };

  return (
    <div className={classes.tasksPage}>
      {notification.status && <Notification notification={notification} />}
      <h2 className={classes["tasksPage__title"]}>
        <em>
          <strong>{matchingEmployee?.name}</strong>{" "}
        </em>
        's tasks
      </h2>
      <Button
        onClick={() => setNewTaskClicked((prevValue) => !prevValue)}
        className={classes["tasksPage__newTaskBtn"]}
      >
        New Task
      </Button>
      {newTaskClicked && (
        <TaskForm onRegisterFormSubmit={onRegisterFormSubmit} />
      )}
      <TaskList
        taskList={taskList}
        onDeleteTaskHandler={onDeleteTaskHandler}
        onDoneTaskHandler={onDoneTaskHandler}
        onNotDoneTaskHandler={onNotDoneTaskHandler}
      />
    </div>
  );
};

export default TasksPage;
