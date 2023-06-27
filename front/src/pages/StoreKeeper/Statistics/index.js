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
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Remove,
  Search,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import service from "../../../utils/request";
import AddModal from "./AddModal";
import SubModal from "./SubModal";

function createNumArray(start, end) {
  const res = [];
  for (let i = start; i <= end; i++) {
    res.push(i);
  }
  return res;
}

export default function Statistics() {
  const [list, setList] = useState([]);

  const getAll = () => {
    service
      .get("/sys/storageGoods/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          setList(res.data.map((obj) => ({ ...obj, checked: false })));
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取库存信息失败");
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

  const [filteredStorageName, setFilteredStorageName] = useState("");
  const [filteredGoodsName, setFilteredGoodsName] = useState("");
  const [filteredNumber, setFIlteredNumber] = useState(0);
  useEffect(() => {
    if (!filteredNumber || filteredNumber < 0) setFIlteredNumber(0);
  }, [filteredNumber]);

  const search = () => {
    service
      .get("/sys/storageGoods/all")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          setList(
            res.data.filter(
              (item) =>
                item.storageName.includes(filteredStorageName) &&
                item.goodsName.includes(filteredGoodsName) &&
                item.number >= filteredNumber
            )
          );
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取库存信息失败");
      });
  };

  const [addOpen, setAddOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const [recordId, setRecordId] = useState();
  const [currentNum, setCurrentNum] = useState();
  const [storageName, setStorageName] = useState("");
  const [goodsName, setGoodsName] = useState("");

  const handleAdd = (id, num, storageName, goodsName) => () => {
    setRecordId(id);
    setCurrentNum(num);
    setStorageName(storageName);
    setGoodsName(goodsName);
    setAddOpen(true);
  };

  const handleSub = (id, num, storageName, goodsName) => () => {
    setRecordId(id);
    setCurrentNum(num);
    setStorageName(storageName);
    setGoodsName(goodsName);
    setSubOpen(true);
  };

  return (
    <Stack>
      <Box display={"flex"} px={"20px"} mt={"20px"}>
        <Box>
          <Typography component={"span"} fontSize={"16px"} mr={"20px"}>
            仓库名称
          </Typography>
          <TextField
            placeholder="仓库名"
            value={filteredStorageName}
            onChange={(e) => setFilteredStorageName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "200px",
                height: "30px",
                fontSize: "16px",
              },
            }}
          />
          <Typography component={"span"} fontSize={"16px"} mx={"20px"}>
            货品名
          </Typography>
          <TextField
            placeholder="货品名"
            value={filteredGoodsName}
            onChange={(e) => setFilteredGoodsName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                width: "200px",
                height: "30px",
                fontSize: "16px",
              },
            }}
          />
          <Typography component={"span"} fontSize={"16px"} mx={"20px"}>
            数量≥
          </Typography>
          <TextField
            placeholder=""
            type="number"
            inputProps={{ min: "0", step: "1" }}
            value={filteredNumber}
            onChange={(e) => setFIlteredNumber(e.target.value)}
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
              <TableCell align="center">记录ID</TableCell>
              <TableCell align="center">仓库ID</TableCell>
              <TableCell align="center">仓库名</TableCell>
              <TableCell align="center">货品ID</TableCell>
              <TableCell align="center">货品名</TableCell>
              <TableCell align="center">数量</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.recordId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.recordId}</TableCell>
                <TableCell align="center">{row.storageId}</TableCell>
                <TableCell align="center">{row.storageName}</TableCell>
                <TableCell align="center">{row.goodsId}</TableCell>
                <TableCell align="center">{row.goodsName}</TableCell>
                <TableCell align="center">{row.number}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={handleAdd(
                      row.recordId,
                      row.number,
                      row.storageName,
                      row.goodsName
                    )}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    onClick={handleSub(
                      row.recordId,
                      row.number,
                      row.storageName,
                      row.goodsName
                    )}
                  >
                    <Remove />
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
        recordId={recordId}
        currentNum={currentNum}
        storageName={storageName}
        goodsName={goodsName}
        getAll={getAll}
      />
      <SubModal
        open={subOpen}
        onClose={() => setSubOpen(false)}
        recordId={recordId}
        currentNum={currentNum}
        storageName={storageName}
        goodsName={goodsName}
        getAll={getAll}
      />
    </Stack>
  );
}
