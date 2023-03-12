import { useEffect, useState } from "react";
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { Employee } from "../../types/types";
import classes from "./EmployeesPage.module.scss"
import EmployeeItem from "../../components/EmployeeItem/EmployeeItem";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const dbRef = ref(getDatabase());
  const db = getDatabase();

  useEffect(() => {
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
  }, []);

  
  

  const onDeleteEmployeeHandler = (id: string) => {
    remove(ref(db, "employees/" + id))
      .then(() => {
        // Data saved successfully!
        const updatedEmployees = employees.filter(
          (employee) => employee.id !== id
        );
        setEmployees(updatedEmployees);
      })
      .catch((error) => {
        // The write failed...
      });
  };

  return (
    <div className={classes["employees"]}>
      <ul className={classes["employees__list"]}>
        {employees.map((employee) => (
          <EmployeeItem employee={employee} onDeleteEmployeeHandler={onDeleteEmployeeHandler}/>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesPage;
