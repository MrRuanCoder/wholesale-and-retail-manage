import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  Edit,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import service from "../../../utils/request";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

function createNumArray(start, end) {
  const res = [];
  for (let i = start; i <= end; i++) {
    res.push(i);
  }
  return res;
}

export default function Manage() {
  const [list, setList] = useState([]);

  const getAll = () => {
    service
      .get("/sys/storage/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          setList(res.data.map((obj) => ({ ...obj, checked: false })));
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取仓库列表失败");
      });
  };

  useEffect(getAll, []);

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

  const [filteredName, setFilteredName] = useState("");

  const search = () => {
    service
      .get("/sys/storage/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          setList(
            res.data.filter((item) => item.storageName.includes(filteredName))
          );
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取仓库列表失败");
      });
  };

  const [updateOpen, setUpdateOpen] = useState(false);

  const [addOpen, setAddOpen] = useState(false);

  const [id, setId] = useState(null);

  const handleEdit = (id) => () => {
    setUpdateOpen(true);
    setId(id);
  };

  const handleAdd = () => {
    setAddOpen(true);
  };

  return (
    <Stack>
      <Box display={"flex"} mt={"20px"} px={"20px"}>
        <Box>
          <Typography component={"span"} fontSize={"16px"} mr={"20px"}>
            仓库名称
          </Typography>
          <TextField
            placeholder="仓库名"
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
        </Box>
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
        <Button
          variant="contained"
          sx={{
            paddingLeft: "10px",
            paddingRight: "14px",
            height: "30px",
            bgcolor: "#FF9800",
            color: "#fff",
            marginLeft: "30px",
            fontSize: "14px",
            "&:hover": {
              bgcolor: "#db8c21",
            },
          }}
          onClick={handleAdd}
        >
          <Add
            sx={{
              marginRight: "0px",
            }}
          />
          新增
        </Button>
        <Select
          size="small"
          value={itemPerPage}
          onChange={(e) => setItemPerPage(e.target.value)}
          sx={{
            minWidth: "125px",
            maxWidth: "150px",
            fontSize: "14px",
            ml: "auto",
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
              <TableCell align="center">仓库ID</TableCell>
              <TableCell align="center">仓库名</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.storageId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.storageId}</TableCell>
                <TableCell align="center">{row.storageName}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={handleEdit(row.storageId)}>
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
      <AddModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        getAll={getAll}
      />
      <UpdateModal
        open={updateOpen}
        id={id}
        onClose={() => setUpdateOpen(false)}
        getAll={getAll}
      />
    </Stack>
  );
}
