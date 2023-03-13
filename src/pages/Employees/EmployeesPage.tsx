import { useEffect, useState } from "react";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { Employee, NotificationType } from "../../types/types";
import classes from "./EmployeesPage.module.scss";
import EmployeeItem from "../../components/EmployeeItem/EmployeeItem";
import Notification from "../../components/Notification/Notification";

const emptyNotification: NotificationType = {
  status: "",
  title: "",
  message: "",
};

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [notification, setNotification] =
    useState<NotificationType>(emptyNotification);
  

  const dbRef = ref(getDatabase());
  const db = getDatabase();

  useEffect(() => {
    if (notification.status !== "") {
      setTimeout(() => {
        setNotification(emptyNotification);
      }, 2000);
    }
  }, [notification]);

  useEffect(() => {
    get(child(dbRef, `employees`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let employees = snapshot.val();
          const employeesMap = Object.keys(employees).map(
            (item) => employees[item]
          );
          setEmployees(employeesMap);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);

  const onDeleteEmployeeHandler = (id: string) => {
    remove(ref(db, "employees/" + id))
      .then(() => {
        const updatedEmployees = employees.filter(
          (employee) => employee.id !== id
        );
        setEmployees(updatedEmployees);
        setNotification({
          status: "success",
          title: "Delete complete!",
          message: "Successfully removed an employee",
        });
      })
      .catch((error) => {});
  };

  return (
    <div className={classes["employees"]}>
      {notification.status && <Notification notification={notification} />}
      <ul className={classes["employees__list"]}>
        {employees.map((employee) => (
          <EmployeeItem
            key={employee.id}
            employee={employee}
            onDeleteEmployeeHandler={onDeleteEmployeeHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default EmployeesPage;
