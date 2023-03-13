import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import classes from "./UpdateTaskForm.module.scss";
import { getDatabase, ref, update } from "firebase/database";
import app from "../../firebase/firebase";
import { useNavigate, useParams } from "react-router";
import { Task } from "../../types/types";

type UpdateTaskFormProps = {
  matchingTask: Task | undefined;
};

const UpdateTaskForm = ({ matchingTask }: UpdateTaskFormProps) => {
  const params = useParams();
  const employeeId = params.employeeId;
  const taskId = params.taskId;
  const navigate = useNavigate();
  const db = getDatabase(app);

  const onRegisterFormSubmit = async (data: Task) => {
    try {
      const updateData: Task = {
        id: data.id || matchingTask?.id || "",
        title: data.title || matchingTask?.title || "",
        description: data.description || matchingTask?.description || "",
        date: data.date || matchingTask?.date || "",
        completed: data.completed ?? matchingTask?.completed ?? false,
      };

      const updates: Task = updateData;

      await update(
        ref(db, "employees/" + employeeId + "/tasks/" + taskId),
        updates
      );

      navigate("/employees/" + employeeId + "/tasks/");
    } catch (err) {}
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<Task>({
    mode: "all",
    defaultValues: {
      completed: matchingTask?.completed || false,
    },
  });

  useEffect(() => {
    reset(matchingTask);
  }, [matchingTask, reset]);

  const onSubmit: SubmitHandler<Task> = (data) => onRegisterFormSubmit(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Full name"
          {...register("title", { required: false, minLength: 3 })}
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
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          {...register("description", {
            required: false,
          })}
        />

        {errors.description && errors.description.type === "required" && (
          <p className={classes["form--error"]}>description is required</p>
        )}
        {errors.description && errors.description.type === "pattern" && (
          <p className={classes["form--error"]}>
            Please enter a valid email address
          </p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Add date"
          {...register("date", { required: false })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Completed</Form.Label>
        <Form.Check
          type="switch"
          label="Completed?"
          {...register("completed", { required: false })}
          checked={watch("completed")}
        />
      </Form.Group>
      <div className={classes["form__actions"]}>
        <Button variant="primary" type="submit" disabled={!isDirty || !isValid}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default UpdateTaskForm;
