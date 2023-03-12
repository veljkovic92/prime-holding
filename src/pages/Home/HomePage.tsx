import React from "react";
import UserForm from "../../components/UserForm/UserForm";
import classes from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={classes["home-page"]}>
      <UserForm />
    </div>
  );
};

export default HomePage;
