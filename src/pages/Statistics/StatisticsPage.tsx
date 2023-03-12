import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Employee, Task } from "../../types/types";
import classes from "./StatisticsPage.module.scss";

const StatisticsPage = () => {
  const dbRef = ref(getDatabase());

  const arrowObject = [
    {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    },
  ];

  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [busiestEmployee, setBusiestEmployee] = useState<Employee>();

  const [topFiveEmployees, setTopFiveEmployees] = useState<Employee[]>([]);

  const [arrowClicked, setArrowClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const getTasksCompleted = () => {
    let noOfCompletedTasks = 0;
    allTasks.forEach((task) => {
      if (task.completed === true) {
        noOfCompletedTasks++;
      }

      return setTasksCompleted(noOfCompletedTasks);
    });
  };

  const getTaskData = () => {
    get(child(dbRef, `employees`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let employees = snapshot.val();
          const employeesMap = Object.keys(employees).map(
            (item) => employees[item]
          );
          setEmployees(employeesMap);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTaskData();
  }, []);

  useEffect(() => {
    getTasksCompleted();
  }, [allTasks]);

  useEffect(() => {
    getAllTasks();
    getTopFiveEmployees();
  }, [employees]);

  const getAllTasks = () => {
    const allTasksArray: Task[] = [];
    if (employees) {
      employees.forEach((employee) => {
        const allEmployeeTasks = employee.tasks;

        if (allEmployeeTasks) {
          Object.keys(allEmployeeTasks).map((task: any) => {
            allTasksArray.push(allEmployeeTasks[task]);
          });
        }

        const busiestEmployee: Employee = {
          id: "",
          name: "",
          email: "",
          tasks: [],
        };

        const getBusiestEmployee = employees.reduce<Employee>(
          (prev, current) => {
            if (prev.tasks && current.tasks) {
              return Object.keys(prev.tasks).length >
                Object.keys(current.tasks).length
                ? prev
                : current;
            }
            return prev;
          },
          busiestEmployee
        );

        setBusiestEmployee(getBusiestEmployee);
      });
    }

    setAllTasks(allTasksArray);
  };

  const getTopFiveEmployees = () => {
    const employeeTasks = employees.map((employee) => {
      let completedTasks = 0;
      if (employee.tasks) {
        Object.keys(employee.tasks).forEach((task: any) => {
          if (employee.tasks && employee.tasks[task].completed === true) {
            completedTasks++;
          }
        });
      }
      return { ...employee, completedTasks };
    });

    const sortedEmployees = employeeTasks.sort(
      (a, b) => b.completedTasks - a.completedTasks
    );

    setTopFiveEmployees(sortedEmployees.slice(0, 5));
  };

  const onArrowClickHandler = (index: number) => {
    const updatedArrowObject = [...arrowClicked];
    updatedArrowObject[index] = !updatedArrowObject[index];
    setArrowClicked(updatedArrowObject);
  };

  const mapTopFiveEmployees =
    topFiveEmployees &&
    topFiveEmployees.map((employee, index) => (
      <li className={classes["statisticsPage__topFive__item"]} key={index}>
        <div
          className={classes["statisticsPage__topFive__item__info"]}
          onClick={() => onArrowClickHandler(index)}
        >
          <h5>
            <BsFillPersonCheckFill /> {employee.name}
          </h5>
          <div
            className={classes["statisticsPage__topFive__item__info__arrow"]}
          >
            {arrowClicked[index] ? (
              <AiOutlineArrowUp />
            ) : (
              <AiOutlineArrowDown />
            )}
          </div>
        </div>
        {arrowClicked[index] && (
          <ul className={classes["statisticsPage__topFive__item__list"]}>
            {employee.tasks !== undefined &&
              Object.keys(employee.tasks).map((task: any) => (
                <li
                  key={employee.tasks![task].id}
                  className={
                    classes["statisticsPage__topFive__item__list__item"]
                  }
                >
                  <p>
                    <strong>Title: </strong>
                    <em>"{employee.tasks![task].title}"</em>
                  </p>
                  <p>
                    <strong>Completed: </strong>
                    <em>
                      {employee.tasks![task].completed === true ? "Yes" : "No"}
                    </em>
                  </p>
                </li>
              ))}
          </ul>
        )}
      </li>
    ));

  return (
    <div className={classes.statisticsPage}>
      <h3>
        <strong>Total Employees: </strong>
        {employees.length}
      </h3>
      <h3>
        <strong>Total Tasks: </strong>
        {allTasks.length}
      </h3>
      <h3>
        <strong>Tasks Completed: </strong>
        {tasksCompleted}
      </h3>
      <h3>
        <strong>Busiest employee: </strong>
        {busiestEmployee?.name || "No Employees yet"}
      </h3>
      <h3>
        <strong>Top Five employees:</strong>
      </h3>
      {mapTopFiveEmployees.length === 0 && <p>No Employees yet</p>}
      <ul className={classes["statisticsPage__topFive"]}>
        {mapTopFiveEmployees}
      </ul>
    </div>
  );
};

export default StatisticsPage;
