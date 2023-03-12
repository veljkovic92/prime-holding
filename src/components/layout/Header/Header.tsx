import { NavLink } from "react-router-dom";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <section className={classes.header}>
      <NavLink
        to="/employees"
        className={({ isActive }) =>
          isActive
            ? `${classes["header--link__active"]} ${classes["header--link"]}`
            : classes["header--link"]
        }
      >
        Employees
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${classes["header--link__active"]} ${classes["header--link"]}`
            : classes["header--link"]
        }
      >
        New Employee
      </NavLink>
      <NavLink
        to="/stats"
        className={({ isActive }) =>
          isActive
            ? `${classes["header--link__active"]} ${classes["header--link"]}`
            : classes["header--link"]
        }
      >
        Statistics
      </NavLink>
    </section>
  );
};

export default Header;
