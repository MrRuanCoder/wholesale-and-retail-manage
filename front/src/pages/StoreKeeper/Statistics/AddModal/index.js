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

function addZero(s) {
  return s < 10 ? "0" + s : s;
}

function getNowTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(
    minute
  )}:${addZero(second)}`;
}

export default function AddModal(props) {
  const {
    open,
    onClose,
    recordId,
    currentNum,
    getAll,
    storageName,
    goodsName,
  } = props;

  const [num, setNum] = useState(1);

  const handleAdd = () => {
    const time = getNowTime();
    const description = `${storageName}中的${goodsName}，数量加${num}`;
    service
      .put("sys/storageGoods", {
        recordId,
        number: parseInt(currentNum) + parseInt(num),
        time,
        description,
        storageName,
        goodsName,
      })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          toast.success("入库成功");
          getAll();
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        onClose();
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
      <DialogTitle>入库</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="入库数量"
          variant="standard"
          margin="dense"
          type="number"
          inputProps={{ min: "1", step: "1" }}
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleAdd}>入库</Button>
      </DialogActions>
    </Dialog>
  );
}
