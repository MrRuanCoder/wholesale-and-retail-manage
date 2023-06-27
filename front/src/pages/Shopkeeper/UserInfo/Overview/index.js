import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Search,
  Add,
  Delete,
  Edit,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import service from "../../../../utils/request";
import { toast } from "react-toastify";
import {
  selectAddFlag,
  selectUpdateFlag,
  setAddFlag,
  setUpdateFlag,
} from "../../../../redux/Slices/ShopKeeperSlice";
import { useDispatch, useSelector } from "react-redux";

function createNumArray(start, end) {
  const res = [];
  for (let i = start; i <= end; i++) {
    res.push(i);
  }
  return res;
}

export default function Overview() {
  const [list, setList] = useState([]);
  const addflag = useSelector(selectAddFlag);
  const updateFlag = useSelector(selectUpdateFlag);

  const dispatch = useDispatch();

  useEffect(() => {
    service
      .get("/sys/customer/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          setList(res.data.map((obj) => ({ ...obj, checked: false })));
          dispatch(setAddFlag(false));
          dispatch(setUpdateFlag(false));
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取客户列表失败");
      });
  }, [addflag, updateFlag, dispatch]);

  const navigate = useNavigate();

  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const totalPage = Math.ceil(list.length / itemPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemPerPage]);

  useEffect(() => {
    setRows(
      list.filter(
        (val, i) =>
          i >= (currentPage - 1) * itemPerPage && i < currentPage * itemPerPage
      )
    );
  }, [currentPage, itemPerPage, list]);

  const [disableLeft, setDisableLeft] = useState(false);
  const [disableRight, setDisableRight] = useState(false);

  useEffect(() => {
    if (currentPage <= 1) setDisableLeft(true);
    else setDisableLeft(false);
    if (currentPage >= totalPage) setDisableRight(true);
    else setDisableRight(false);
  }, [currentPage, totalPage]);

  const [numArray, setNumArray] = useState([]);

  useEffect(() => {
    if (totalPage <= 5) setNumArray(createNumArray(1, totalPage));
    else if (currentPage <= 3) setNumArray(createNumArray(1, 5));
    else if (currentPage >= totalPage - 2)
      setNumArray(createNumArray(totalPage - 4, totalPage));
    else setNumArray(createNumArray(currentPage - 2, currentPage + 2));
  }, [currentPage, totalPage]);

  useEffect(() => {
    if (currentPage > totalPage) setCurrentPage((val) => val - 1);
    if (currentPage < 1 && totalPage > 0) setCurrentPage(1);
  }, [totalPage, currentPage]);

  const [checkedAll, setCheckedAll] = useState(false);
  const handleCheckedAll = (e) => {
    setCheckedAll(e.target.checked);
    setRows((rows) =>
      rows.map((row) => ({ ...row, checked: e.target.checked }))
    );
  };

  const handleChecked = (customerId) => (e) => {
    setList((list) =>
      list.map((item) => {
        if (item.customerId === customerId) {
          return { ...item, checked: e.target.value };
        } else return item;
      })
    );
  };

  useEffect(() => {
    if (rows.every((item) => item.checked)) setCheckedAll(true);
    else setCheckedAll(false);
  }, [rows]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const delItems = rows.filter((row) => row.checked);
    try {
      if (delItems.length === 0) throw new Error("未选择任何用户");
      delItems.forEach((item) => {
        service
          .delete(`/sys/customer/${item.customerId}`)
          .then(({ data: res }) => {
            if (res.code === 20000) {
              setList((list) =>
                list.filter((val) => val.customerId !== item.customerId)
              );
            } else throw new Error(res.message);
          });
      });
      toast.success("删除成功");
    } catch (e) {
      toast.error(e.message);
    } finally {
      handleClose();
    }
  };

  const [filteredName, setFilteredName] = useState("");

  const search = () => {
    service
      .get("/sys/customer/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          setList(res.data.filter((item) => item.name.includes(filteredName)));
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取客户列表失败");
      });
  };

  return (
    <Stack>
      <Box>
        <Typography component={"span"} fontSize={"16px"} mx={"20px"}>
          姓名
        </Typography>
        <TextField
          placeholder="请输入姓名"
          value={filteredName}
          onChange={(e) => setFilteredName(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              width: "200px",
              height: "30px",
              fontSize: "16px",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            paddingLeft: "10px",
            paddingRight: "14px",
            height: "30px",
            bgcolor: "#1890FF",
            color: "#fff",
            marginLeft: "30px",
            fontSize: "14px",
          }}
          onClick={search}
        >
          <Search
            sx={{
              marginRight: "0px",
            }}
          />
          查询
        </Button>
      </Box>
      <Box mt={"10px"} display={"flex"} justifyContent={"space-between"}>
        <Box ml={"20px"}>
          <Button
            variant="contained"
            sx={{
              paddingLeft: "5px",
              paddingRight: "8px",
              marginRight: "20px",
              height: "30px",
              bgcolor: "#FF9800",
              "&:hover": {
                bgcolor: "#db8c21",
              },
            }}
            onClick={() => navigate("../add")}
          >
            <Add
              sx={{
                marginRight: "5px",
              }}
            />
            添加客户
          </Button>
          <Button
            variant="contained"
            sx={{
              paddingLeft: "5px",
              paddingRight: "8px",
              height: "30px",
              bgcolor: "#FF5157",
              "&:hover": {
                bgcolor: "#d6452b",
              },
            }}
            onClick={() => setOpen(true)}
          >
            <Delete
              sx={{
                marginRight: "5px",
              }}
            />
            批量删除
          </Button>
        </Box>
        <Select
          size="small"
          value={itemPerPage}
          onChange={(e) => setItemPerPage(e.target.value)}
          sx={{
            minWidth: "125px",
            maxWidth: "150px",
            fontSize: "14px",
            marginRight: "20px",
            "& .MuiOutlinedInput-input": {
              height: "13px",
            },
          }}
        >
          <MenuItem value={5}>5条/页</MenuItem>
          <MenuItem value={10}>10条/页</MenuItem>
        </Select>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  size="small"
                  checked={checkedAll}
                  onChange={handleCheckedAll}
                />
              </TableCell>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">姓名</TableCell>
              <TableCell align="center">性别</TableCell>
              <TableCell align="center">电话</TableCell>
              <TableCell align="center">地址</TableCell>
              <TableCell align="center">客户类型</TableCell>
              <TableCell align="center">修改信息</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.customerId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Checkbox
                    size="small"
                    checked={row.checked}
                    onChange={handleChecked(row.customerId)}
                  />
                </TableCell>
                <TableCell align="center">{row.customerId}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      navigate(`../update?customerId=${row.customerId}`)
                    }
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display={"flex"} justifyContent={"space-between"} my={"5px"}>
        <Typography
          fontSize={"14px"}
          fontWeight={500}
          lineHeight={"40px"}
          ml={"20px"}
        >
          第{currentPage}页 共{totalPage}页，共{rows.length}条
        </Typography>
        <Box display={"flex"}>
          <IconButton
            disabled={disableLeft}
            onClick={() => setCurrentPage((val) => val - 1)}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Box display={"flex"}>
            {numArray.map((val) => (
              <Button
                key={val}
                onClick={() => setCurrentPage(val)}
                sx={{
                  minWidth: "48px",
                  padding: 0,
                  marginX: "8px",
                  bgcolor: val === currentPage ? "#1990FF" : "#fff",
                  color: val === currentPage ? "#fff" : "#5a5a5a",
                }}
              >
                {val}
              </Button>
            ))}
          </Box>
          <IconButton
            disabled={disableRight}
            onClick={() => setCurrentPage((val) => val + 1)}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <DialogContentText textAlign={"center"}>
            确定删除吗？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleDelete} autoFocus>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
