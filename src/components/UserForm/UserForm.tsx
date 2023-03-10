import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import classes from "./UserForm.module.scss";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { Employee } from "../../types/types";

const UserForm = () => {
  const navigate = useNavigate();

  const db = getDatabase(app);

  const onRegisterFormSubmit = async (data: Employee) => {
    const { name, email, phoneNumber, dateOfBirth, monthlySalary } = data;
    const id = uuidv4();


    set(ref(db, "employees/" + id), {
      id,
      name,
      email,
      phoneNumber,
      dateOfBirth,
      monthlySalary,
    });

    navigate("/employees");
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
          {...register("name", { required: true, minLength: 3 })}
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
            required: true,
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

export default UserForm;
