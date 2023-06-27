import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
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

export default function SubModal(props) {
  const {
    open,
    onClose,
    recordId,
    currentNum,
    getAll,
    storageName,
    goodsName,
  } = props;

  const handleSub = () => {
    const time = getNowTime();
    const description = `${storageName}中的${goodsName}，数量减${num}`;
    service
      .put("sys/storageGoods", {
        recordId,
        number: parseInt(currentNum) - parseInt(num),
        time,
        description,
        storageName,
        goodsName,
      })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          toast.success("出库成功");
          getAll();
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("库存量不能小于0");
      })
      .finally(() => {
        onClose();
      });
  };

  const [num, setNum] = useState(1);

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
      <DialogTitle>出库</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="出库数量"
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
        <Button onClick={handleSub}>出库</Button>
      </DialogActions>
    </Dialog>
  );
}
