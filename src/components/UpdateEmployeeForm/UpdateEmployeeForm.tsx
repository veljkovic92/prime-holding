import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import classes from "./UpdateEmployeeForm.module.scss";
import { getDatabase, get, ref, child, push, update } from "firebase/database";
import app from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import { Employee, UpdateEmployee } from "../../types/types";

const UpdateUserForm = () => {
  const params = useParams();
  const employeeId = params.employeeId;
  const navigate = useNavigate();
  const dbRef = ref(getDatabase());
  const db = getDatabase(app);

  const [matchingEmployee, setMatchingEmployee] = useState<Employee>();

  useEffect(() => {
    get(child(dbRef, `employees/${employeeId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let employee = snapshot.val();

          setMatchingEmployee(employee);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onRegisterFormSubmit = async (data: Employee) => {
    try {
      const updateData: UpdateEmployee = {
        name: data.name || matchingEmployee?.name || "",
        email: data.email || matchingEmployee?.email || "",
        phoneNumber: data.phoneNumber || matchingEmployee?.phoneNumber,
        dateOfBirth: data.dateOfBirth || matchingEmployee?.dateOfBirth,
        monthlySalary: data.monthlySalary || matchingEmployee?.monthlySalary,
      };

      const updates: UpdateEmployee = updateData;

      await update(ref(db, "employees/" + employeeId), updates);

      navigate("/employees");
    } catch (err) {}
  };

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isDirty, isValid },
  } = useForm<Employee>({ mode: "all" });
  const onSubmit: SubmitHandler<Employee> = (data) =>
    onRegisterFormSubmit(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Full name"
          {...register("name", { required: false, minLength: 3 })}
        />
        {errors.name && errors.name.type === "minLength" && (
          <p className={classes["form--error"]}>
            The name must be at least 3 characters long
          </p>
        )}
        {errors.name && errors.name.type === "required" && (
          <p className={classes["form--error"]}>The name is required</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: false,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          })}
        />

        {errors.email && errors.email.type === "required" && (
          <p className={classes["form--error"]}>Email is required</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className={classes["form--error"]}>
            Please enter a valid email address
          </p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Add number"
          {...register("phoneNumber", { required: false, minLength: 6 })}
        />
        {errors.phoneNumber && errors.phoneNumber.type === "minLength" && (
          <p className={classes["form--error"]}>
            Phone number must be at least 6 characters long
          </p>
        )}
        {errors.phoneNumber && errors.phoneNumber.type === "required" && (
          <p className={classes["form--error"]}>Phone number is required</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Add date of birth"
          {...register("dateOfBirth", { required: false })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Monthly Salary</Form.Label>
        <Form.Control
          type="number"
          placeholder="Add salary"
          {...register("monthlySalary", { required: false })}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isDirty || !isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default UpdateUserForm;
