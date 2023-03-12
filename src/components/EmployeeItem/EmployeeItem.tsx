import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Employee } from "../../types/types";
import Card from "../ui/Card/Card";
import classes from "./EmployeeItem.module.scss";
import {FiEdit} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai"

interface IEmployee {
  employee: Employee;
  onDeleteEmployeeHandler: (id: string) => void;
}

const EmployeeItem = ({ employee, onDeleteEmployeeHandler }: IEmployee) => {
  return (
    <Card key={employee.id} className={classes.employeeItem}>
      <div className={classes["employeeItem__info"]}>
        <span>
          <strong>Name:</strong> {employee.name}
        </span>
        <span>
          <strong>Email:</strong> {employee.email}
        </span>
        <span>
          <strong>Phone:</strong> {employee.phoneNumber || <em>Not added</em>}
        </span>
        <span>
          <strong>Birthday:</strong>{" "}
          {employee.dateOfBirth || <em>Not added</em>}
        </span>
        <span>
          <strong>Salary:</strong>{" "}
          {employee.monthlySalary || <em>Not added</em>}
        </span>
      </div>
      <div className={classes["employeeItem__actions"]}>
        <Link to={`${employee.id}/tasks`}>
          <Button>Tasks</Button>
        </Link>
        <div className={classes["employeeItem__actions__additional"]}>
        <Link to={`${employee.id}/form`} className={classes["employeeItem__actions__updateBtn"]} >
          <Button variant="warning"><FiEdit /></Button>
        </Link>
        <Button onClick={() => onDeleteEmployeeHandler(employee.id)} className={classes["employeeItem__actions__deleteBtn"]} variant="danger">
          <AiOutlineDelete />
        </Button>
        </div>
        
      </div>
    </Card>
  );
};

export default EmployeeItem;
