import React from "react";
import classes from "./Body.module.scss"

type BodyProps = {
  children?: React.ReactNode;
};

const Body = ({ children }: BodyProps) => {
  return <main className={classes.body}>{children}</main>;
};

export default Body;
