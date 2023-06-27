import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function DeleteModal(props) {
  const { open, id, onClose } = props;

  const handleDelete = () => {};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "300px",
        },
      }}
    >
      <DialogTitle>
        <Delete />
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign={"center"}>确定删除吗？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleDelete} autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
