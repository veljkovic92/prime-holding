import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UpdateEmployeeForm from "../../components/UpdateEmployeeForm/UpdateEmployeeForm";
import { Employee } from "../../types/types";
import classes from "./UpdateEmployeePage.module.scss";

const UpdateUserPage = () => {
  const params = useParams();
  const employeeId = params.employeeId;
  const dbRef = ref(getDatabase());

  const [matchingEmployee, setMatchingEmployee] = useState<Employee>();

  useEffect(() => {
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
  }, []);

  return (
    <div className={classes.updateEmployee}>
      <h2 className={classes["updateEmployee__title"]}>
        Edit {matchingEmployee?.name}'s profile
      </h2>
      <UpdateEmployeeForm matchingEmployee={matchingEmployee} />
    </div>
  );
};

export default UpdateUserPage;
