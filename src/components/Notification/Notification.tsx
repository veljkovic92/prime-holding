import React from "react";
import { NotificationType } from "../../types/types";
import Modal from "../ui/Modal/Modal";
import classes from "./Notification.module.scss";

const Notification = ({
  notification: { status, title, message },
}: {
  notification: NotificationType;
}) => {
  return (
    <Modal
      className={`${classes.notification} ${
        status === "success" ? classes["notification--green"] : classes["notification--red"]
      }`}
    >
      <h1>{title}</h1>
      <p>{message}</p>
    </Modal>
  );
};

export default Notification;
