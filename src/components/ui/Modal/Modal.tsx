import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
import { useEffect } from "react";
import Card from "../Card/Card";
import { LayoutProps } from "../../../types/types";

type LayoutPropsExtended = LayoutProps & {
  className?: string;
  text?: string;
};

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children, className }: LayoutPropsExtended) => {
  return <Card className={`${classes.overlay} ${className}`}>{children}</Card>;
};

const Modal = ({ children, className }: LayoutPropsExtended) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("overlays")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        document.getElementById("overlays")!
      )}
    </div>
  );
};

export default Modal;
