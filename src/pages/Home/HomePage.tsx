import UserForm from "../../components/EmployeeForm/EmployeeForm";
import classes from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={classes["home-page"]}>
      <UserForm />
    </div>
  );
};

export default HomePage;
