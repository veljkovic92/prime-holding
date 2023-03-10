import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import classes from "./TaskForm.module.scss";
import { Task } from "../../types/types";

interface ITaskForm {
  onRegisterFormSubmit: (data: Task) => void;
}

const TaskForm = ({ onRegisterFormSubmit }: ITaskForm) => {
  const {
    register,
    handleSubmit,

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
          <p className={classes["form--error"]}>The title is required</p>
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
          <p className={classes["form--error"]}>Description is required</p>
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
        />
      </Form.Group>
      <div className={classes["form__actions"]}>
        <Button variant="primary" type="submit" disabled={!isDirty || !isValid}>
          Create
        </Button>
      </div>
    </Form>
  );
};

export default TaskForm;
