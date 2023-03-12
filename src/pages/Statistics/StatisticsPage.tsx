import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Employee, Task } from "../../types/types";

const StatisticsPage = () => {
  const dbRef = ref(getDatabase());

  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [busiestEmployee, setBusiestEmployee] = useState<Employee>();

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
          console.log("No data available");
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
    getAllTasks();
  }, [employees]);

  const getAllTasks = () => {
    const allTasksArray: Task[] = [];
    if (employees) {
      employees.forEach((employee) => {
        const allEmployeeTasks = employee.tasks;

        if (allEmployeeTasks) {
          Object.keys(allEmployeeTasks).map((task: any) => {
            allTasksArray.push(allTasks[task]);
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

  return (
    <div>
      <p>Total Employees: {employees.length}</p>
      <p>Total Tasks: {allTasks.length}</p>
      <p>Busiest employee: {busiestEmployee?.name}</p>
    </div>
  );
};

export default StatisticsPage;
