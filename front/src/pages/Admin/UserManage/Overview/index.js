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
  Autocomplete,
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
import { useDispatch, useSelector } from "react-redux";
import { toggleChecked, delUser } from "../../../../redux/Slices/UserSlice";
import service from "../../../../utils/request";
import { init } from "../../../../redux/Slices/UserSlice";
import { toast } from "react-toastify";

function createNumArray(start, end) {
  const res = [];
  for (let i = start; i <= end; i++) {
    res.push(i);
  }
  return res;
}

const roleMap = {
  1: "系统管理员",
  2: "店长",
  5: "客户",
  6: "供货商",
  7: "采购员",
  8: "销售员",
  9: "仓库管理员",
};

export default function Overview() {
  const dispatch = useDispatch();

  useEffect(() => {
    service
      .get("/sys/user/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          dispatch(init(res.data));
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取用户列表失败");
      });
  }, [dispatch]);

  const navigate = useNavigate();

  const list = useSelector((state) => state.users.list);

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
    rows.forEach((item) => {
      dispatch(
        toggleChecked({ userId: item.userId, checked: e.target.checked })
      );
    });
  };

  useEffect(() => {
    if (rows.every((item) => item.checked)) setCheckedAll(true);
    else setCheckedAll(false);
  }, [rows]);

  const handleDelete = () => {
    const delItems = rows.filter((row) => row.checked);
    try {
      delItems.forEach((item) => {
        service.delete(`/sys/user/${item.userId}`).then(({ data: res }) => {
          if (res.code === 20000) {
            dispatch(delUser({ userId: item.userId }));
          } else throw new Error(res.message);
        });
      });
      toast.success("删除成功");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const [filteredName, setFilteredName] = useState("");

  const search = () => {
    service
      .get("/sys/user/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          dispatch(
            init(
              res.data.filter((item) => item.username.startsWith(filteredName))
            )
          );
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取用户列表失败");
      });
  };

  return (
    <Stack>
      <Box>
        <Typography component={"span"} fontSize={"16px"} mx={"20px"}>
          用户名
        </Typography>
        <TextField
          placeholder="请输入用户名"
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
            添加用户
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
            onClick={handleDelete}
          >
            <Delete
              sx={{
                marginRight: "5px",
              }}
            />
            批量删除
          </Button>
        </Box>
        <Autocomplete
          size="small"
          disableClearable
          value={itemPerPage + "条/页"}
          onChange={(event, newValue) => {
            setItemPerPage(newValue === "10条/页" ? 10 : 5);
          }}
          options={["10条/页", "5条/页"]}
          sx={{
            minWidth: "125px",
            maxWidth: "150px",
            fontSize: "14px",
            marginRight: "20px",
            "& .MuiOutlinedInput-input": {
              height: "13px",
            },
          }}
          renderInput={(params) => <TextField {...params} />}
        />
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
              <TableCell align="center">用户名</TableCell>
              {/* <TableCell align="center">密码</TableCell> */}
              <TableCell align="center">职位</TableCell>
              <TableCell align="center">电话</TableCell>
              <TableCell align="center">邮箱</TableCell>
              <TableCell align="center">地址</TableCell>
              <TableCell align="center">描述</TableCell>
              <TableCell align="center">修改信息</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.userId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Checkbox
                    size="small"
                    checked={row.checked}
                    onChange={() =>
                      dispatch(
                        toggleChecked({
                          userId: row.userId,
                          checked: !row.checked,
                        })
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">{row.userId}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                {/* <TableCell align="center">{row.password}</TableCell> */}
                <TableCell align="center">{roleMap[row.roleId]}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => navigate(`../update?userId=${row.userId}`)}
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
    </Stack>
  );
}
