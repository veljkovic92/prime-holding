import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import classes from "./TaskForm.module.scss";
import { child, get, getDatabase, ref, set } from "firebase/database";
import app from "../../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import { Employee, Task } from "../../types/types";

const TaskForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const db = getDatabase(app);
  const dbRef = ref(getDatabase());
  const [matchingTasks, setMatchingTasks] = useState<Task[]>([]);

  const getData = () => {
    get(child(dbRef, `employees/${params.employeeId}/tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let tasks = snapshot.val();
          const tasksMap = Object.keys(tasks).map((item) => tasks[item]);
          setMatchingTasks(tasksMap);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onRegisterFormSubmit = async (data: Task) => {
    const { title, description, assignee, date } = data;
    const id = uuidv4();

    set(ref(db, "employees/" + params.employeeId + "/tasks/" + id), {
      id,
      title,
      description,
      assignee,
      date,
    })
      .then((res) => {
        console.log(res);

        getData();
      })
      .catch((err) => {});
  };

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isDirty, isValid },
  } = useForm<Task>({ mode: "all" });
  const onSubmit: SubmitHandler<Task> = (data) => onRegisterFormSubmit(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your Task Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Task name"
          {...register("title", { required: true, minLength: 3 })}
        />
        {errors.title && errors.title.type === "minLength" && (
          <p className={classes["form--error"]}>
            The title must be at least 3 characters long
          </p>
        )}
        {errors.title && errors.title.type === "required" && (
          <p className={classes["form--error"]}>The name is required</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          {...register("description", {
            required: true,
          })}
        />

        {errors.description && errors.description.type === "required" && (
          <p className={classes["form--error"]}>Email is required</p>
        )}
        {errors.description && errors.description.type === "pattern" && (
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
          {...register("assignee", { required: false, minLength: 6 })}
        />
        {errors.assignee && errors.assignee.type === "minLength" && (
          <p className={classes["form--error"]}>
            Phone number must be at least 6 characters long
          </p>
        )}
        {errors.assignee && errors.assignee.type === "required" && (
          <p className={classes["form--error"]}>Phone number is required</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Add date"
          {...register("date", { required: false })}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isDirty || !isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default TaskForm;
