import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = ({
  show,
  onHide,
  children,
  className,
  dialogClassName="",
  centered = true,
  ...rest
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered={centered}
      className={className}
      dialogClassName={dialogClassName}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
