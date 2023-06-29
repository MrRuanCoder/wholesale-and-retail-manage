import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import service from "../../../../utils/request";
import { toast } from "react-toastify";
import { Add, Remove } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useRequest } from "ahooks";
import { useSelector } from "react-redux";

export default function UpdateModal(props) {
  const { open, onClose, getAll, orderId, idArr } = props;

  const username = useSelector((state) => state.auth.username);

  const [list, setList] = useState([{}]);

  useEffect(() => {
    if (!orderId) return;
    service
      .get(`/sys/orderSaled/${orderId}`)
      .then(({ data: res }) => {
        if (res.code === 20000) {
          setList(res.data);
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取销售单信息失败");
      });
  }, [orderId]);

  function getGoods() {
    return service.get("sys/goods/all");
  }

  const [goodsList, setGoodsList] = useState([]);

  useRequest(getGoods, {
    onSuccess: (data) => {
      setGoodsList(
        data.data.data.map((item) => ({
          name: item.name,
          price: item.wholesalePrice,
        }))
      );
    },
  });

  const handleUpdate = () => {
    const description = list.reduce(
      (prev, cur) => prev + ` ${cur.goodsName}卖出数量${cur.number}`,
      ""
    );
    try {
      Promise.all(
        idArr.map((id, index) =>
          service.put("/sys/orderSaled", {
            id,
            number: parseInt(list[index]?.number),
            description,
          })
        )
      ).then((values) => {
        if (values.every((val) => val.data.code === 20000)) {
          toast.success("修改成功");
          getAll();
        } else throw new Error("修改失败");
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "1000px",
        },
      }}
    >
      <DialogTitle
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        修改售货单
        <IconButton onClick={() => setList((list) => [...list, {}])} disabled>
          <Add />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">商品名称</TableCell>
                <TableCell align="center">购买数量</TableCell>
                <TableCell align="center">单价</TableCell>
                <TableCell align="center">金额</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{item.goodsName}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      inputProps={{ min: "0", step: "1" }}
                      value={item.number || 0}
                      onChange={(e) =>
                        setList((list) =>
                          list.map((item, i) =>
                            i === index
                              ? { ...item, number: e.target.value }
                              : item
                          )
                        )
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": { height: "40px" },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {goodsList
                      .filter((goods) => goods.name === item.goodsName)
                      .reduce((prev, cur) => prev + cur.price, 0)}
                  </TableCell>
                  <TableCell align="center">
                    {goodsList
                      .filter((goods) => goods.name === item.goodsName)
                      .reduce((prev, cur) => prev + cur.price, 0) *
                      item.number || 0}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      disabled
                      onClick={() => {
                        setList((list) =>
                          list.filter((item, i) => index !== i)
                        );
                      }}
                    >
                      <Remove />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={"20px"}
        >
          <Box display={"flex"} alignItems={"center"}>
            开票人:&nbsp;&nbsp;{username}
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            金额总计:&nbsp;&nbsp;
            {list.reduce(
              (prev, cur) =>
                prev +
                parseInt(cur?.number || 0) *
                  parseInt(
                    goodsList
                      .filter((goods) => goods.name === cur.goodsName)
                      .reduce((prev, cur) => prev + cur.price, 0)
                  ),
              0
            )}
            （元）
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleUpdate}>修改</Button>
      </DialogActions>
    </Dialog>
  );
}
