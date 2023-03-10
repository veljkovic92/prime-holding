import React from "react";
import { useParams } from "react-router";
import UpdateUserForm from "../../components/UpdateEmployeeForm/UpdateEmployeeForm";

const UpdateUserPage = () => {
  const params = useParams();
  console.log(params.employeeId);
  
  return (
    <div>
      <h2>Update User Data:</h2>
      <UpdateUserForm />
    </div>
  );
};

export default UpdateUserPage;
