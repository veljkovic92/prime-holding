import { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";
import { Employee, Task } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
import { useParams } from "react-router";
import app from "../../firebase/firebase";
import classes from "./TasksPage.module.scss";
import { Button } from "react-bootstrap";

const TasksPage = () => {
  const params = useParams();
  const db = getDatabase(app);
  const dbRef = ref(getDatabase());
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [matchingEmployee, setMatchingEmployee] = useState<Employee>();
  const [newTaskClicked, setNewTaskClicked] = useState(false);

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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onRegisterFormSubmit = async (data: Task) => {
    const { title, description, date, completed } = data;
    const id = uuidv4();

    await set(ref(db, "employees/" + params.employeeId + "/tasks/" + id), {
      id,
      title,
      description,
      date,
      completed,
    });

    getData();
    setNewTaskClicked(false);
  };

  const onDeleteTaskHandler = async (id: string) => {
    await remove(ref(db, "employees/" + params.employeeId + "/tasks/" + id));
    getData();
  };

  const onDoneTaskHandler = async (id: string) => {
    await set(
      ref(
        db,
        "employees/" + params.employeeId + "/tasks/" + id + "/completed/"
      ),
      true
    );
    getData();
  };

  const onNotDoneTaskHandler = async (id: string) => {
    await set(
      ref(
        db,
        "employees/" + params.employeeId + "/tasks/" + id + "/completed/"
      ),
      false
    );
    getData();
  };

  return (
    <div className={classes.tasksPage}>
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
