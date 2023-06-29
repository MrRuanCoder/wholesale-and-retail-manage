import {
  Autocomplete,
  Button,
  CircularProgress,
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
import React, { useState, Fragment } from "react";
import service from "../../../../utils/request";
import { toast } from "react-toastify";
import { Add, Remove } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useRequest } from "ahooks";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

export default function AddModal(props) {
  const { open, onClose, getAll } = props;

  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);

  const [list, setList] = useState([{}]);

  function getGoods() {
    return service.get("sys/goods/all");
  }

  const [goodsList, setGoodsList] = useState([]);

  const { loading: loadingGoods, run: runGoods } = useRequest(getGoods, {
    manual: true,
    onSuccess: (data) => {
      setGoodsList(
        data.data.data.map((item) => ({
          name: item.name,
          price: item.wholesalePrice,
        }))
      );
    },
  });

  const handleAdd = () => {
    const orderId = nanoid();
    const list1 = list.map((item) => ({
      goodsName: item.goods?.name,
      number: item.number,
      userId,
      orderId,
    }));
    const description = list1.reduce(
      (prev, cur) => prev + ` ${cur.goodsName}卖出数量${cur.number}`,
      ""
    );
    service
      .post(
        "/sys/orderSaled/add",
        list1.map((item) => ({ ...item, description }))
      )
      .then(({ data: res }) => {
        if (res.code === 20000) {
          toast.success("添加成功");
          getAll();
          onClose();
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
          minWidth: "1000px",
        },
      }}
    >
      <DialogTitle
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        新增售货单
        <IconButton onClick={() => setList((list) => [...list, {}])}>
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
                  <TableCell>
                    <Autocomplete
                      options={goodsList}
                      loading={loadingGoods}
                      onOpen={runGoods}
                      size="small"
                      sx={{ minWidth: "120px" }}
                      disableClearable
                      value={item?.goods || { name: "" }}
                      onChange={(e, newValue) =>
                        setList((list) =>
                          list.map((item, i) =>
                            i === index ? { ...item, goods: newValue } : item
                          )
                        )
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <Fragment>
                                {loadingGoods ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </TableCell>
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
                  <TableCell align="center">{item.goods?.price}</TableCell>
                  <TableCell align="center">
                    {item.goods?.price * item.number || 0}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      disabled={list.length === 1}
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
                parseInt(cur?.number || 0) * parseInt(cur?.goods?.price || 0),
              0
            )}
            （元）
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleAdd}>添加</Button>
      </DialogActions>
    </Dialog>
  );
}
