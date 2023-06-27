import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import service from "../../../../utils/request";

export default function UpdateModal(props) {
  const { open, id: storageId, onClose, getAll } = props;

  const [storageName, setStorageName] = useState("");

  useEffect(() => {
    if (!storageId) return;
    service
      .get(`/sys/storage/${storageId}`)
      .then(({ data: res }) => {
        if (res.code === 20000) {
          const { storageName } = res.data;
          setStorageName(storageName);
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取仓库信息失败");
      });
  }, [storageId]);

  const handleUpdate = () => {
    service
      .put("/sys/storage", {
        storageId,
        storageName,
      })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          toast.success("修改成功");
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
      <DialogTitle>修改仓库信息</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="仓库ID"
          variant="standard"
          margin="dense"
          value={storageId}
          disabled
        />
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
        <Button onClick={handleUpdate}>修改</Button>
      </DialogActions>
    </Dialog>
  );
}
