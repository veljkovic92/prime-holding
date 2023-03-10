import React from "react";
import UserForm from "../../components/UserForm/UserForm";
import classes from "./HomePage.module.scss"

const HomePage = () => {
  return (
    <div className={classes["home-page"]}>
      <h2>Add New User</h2>
      <UserForm />
    </div>
  );
};

export default HomePage;
