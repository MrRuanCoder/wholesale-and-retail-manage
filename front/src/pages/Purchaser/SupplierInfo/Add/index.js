import {
  Box,
  Stack,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Button,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../../../utils/request";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAddFlag } from "../../../../redux/Slices/PurchaserSlice";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& td, & th": {
    border: 0,
  },
}));

export default function Add() {
  const [supplierName, setSupplierName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAdd = () => {
    service
      .post("/sys/supplier/add", {
        supplierName,
        phone,
        email,
        address,
        type,
        description,
      })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          dispatch(setAddFlag(true));
          toast.success("添加成功");
          navigate("../overview");
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (
      supplierName === "" ||
      phone === "" ||
      email === "" ||
      type === "" ||
      address === "" ||
      description === ""
    )
      setDisabled(true);
    else setDisabled(false);
  }, [supplierName, phone, email, type, address, description]);

  return (
    <Stack mx={"20px"}>
      <Typography
        fontSize={"18px"}
        paddingY={"10px"}
        paddingLeft={"10px"}
        sx={{
          bgcolor: "#F0F0F0",
        }}
      >
        添加用户
      </Typography>
      <TableContainer>
        <Table sx={{ maxWidth: 1000, marginX: "auto" }} size="small">
          <TableBody>
            <StyledTableRow>
              <TableCell>
                <Typography>供应商名称</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="请输入供应商名称"
                  fullWidth
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>
                <Typography>电话</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="请输入电话"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>
                <Typography>邮箱</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="请输入邮箱"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>
                <Typography>地址</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="请输入地址"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>
                <Typography>类型</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="请输入商品类型"
                  fullWidth
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>
                <Typography>描述</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="输入你的描述"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingRight={"470px"}
        mt={"20px"}
      >
        <Button variant="contained" onClick={() => navigate("../")}>
          返回
        </Button>
        <Button variant="contained" disabled={disabled} onClick={handleAdd}>
          添加
        </Button>
      </Box>
    </Stack>
  );
}
