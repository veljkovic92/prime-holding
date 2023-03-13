import React from "react";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <section className={classes.footer}>
      <p>
        <em>
          All trademarks are the property of their respective owners. All rights
          reserved © 2023 Veljkovic Edge Ltd.
        </em>
      </p>
    </section>
  );
};

export default Footer;
