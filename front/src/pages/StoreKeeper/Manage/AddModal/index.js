import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import service from "../../../../utils/request";
import { toast } from "react-toastify";

export default function AddModal(props) {
  const { open, onClose, getAll } = props;

  const [storageName, setStorageName] = useState("");

  const handleAdd = () => {
    service
      .post("/sys/storage/add", {
        storageName,
      })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          toast.success("添加成功");
          onClose();
          getAll();
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "450px",
        },
      }}
    >
      <DialogTitle>新增仓库</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="仓库名"
          variant="standard"
          margin="dense"
          value={storageName}
          onChange={(e) => setStorageName(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleAdd}>添加</Button>
      </DialogActions>
    </Dialog>
  );
}
