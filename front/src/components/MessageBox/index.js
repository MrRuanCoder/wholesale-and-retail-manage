import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function MessgaeBox(props) {
  const { type, title, open, onClose } = props;
  console.log(title);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={onclose}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {title}
      </Alert>
    </Snackbar>
  );
}
