import React from "react";
import { Spinner } from "react-bootstrap";
import { TableCell, TableRow } from "../table";

export const Loader = ({ size = "sm" }) => (
  <div className="d-flex justify-content-center align-items-center w-100">
    <Spinner animation="border" size={size} />
  </div>
);

export const TableLoader = ({ colSpan = 5 }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Loader />
      </TableCell>
    </TableRow>
  );
};

export const FullScreenLoading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
};
