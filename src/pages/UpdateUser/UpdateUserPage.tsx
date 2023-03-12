import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UpdateUserForm from "../../components/UpdateEmployeeForm/UpdateEmployeeForm";
import { Employee } from "../../types/types";

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
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Update User Data: {matchingEmployee?.name}</h2>
      <UpdateUserForm matchingEmployee={matchingEmployee} />
    </div>
  );
};

export default UpdateUserPage;
