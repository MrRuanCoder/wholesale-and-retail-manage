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
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import service from "../../../../utils/request";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUpdateFlag } from "../../../../redux/Slices/PurchaserSlice";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& td, & th": {
    border: 0,
  },
}));

export default function Update() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("supplierName");

  const [supplierName, setSupplierName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    service
      .get(`/sys/supplier/${name}`)
      .then(({ data: res }) => {
        if (res.code === 20000) {
          const { supplierName, phone, email, address, type, description } =
            res.data;
          setSupplierName(supplierName);
          setPhone(phone);
          setEmail(email);
          setAddress(address);
          setType(type);
          setDescription(description);
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取供应商信息失败");
      });
  }, [name]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUpdate = () => {
    service
      .put("/sys/supplier", {
        supplierName,
        phone,
        email,
        address,
        type,
        description,
      })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          dispatch(setUpdateFlag(true));
          toast.success("修改成功");
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
        修改用户
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
                  disabled
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
        <Button variant="contained" disabled={disabled} onClick={handleUpdate}>
          修改
        </Button>
      </Box>
    </Stack>
  );
}
