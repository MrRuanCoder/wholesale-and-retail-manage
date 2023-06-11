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
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import service from "../../../../utils/request";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUpdateFlag } from "../../../../redux/Slices/ShopKeeperSlice.js";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "& td, & th": {
    border: 0,
  },
}));

export default function Update() {
  const [searchParams] = useSearchParams();
  const customerId = parseInt(searchParams.get("customerId"));

  useEffect(() => {
    service
      .get(`/sys/customer/${customerId}`)
      .then(({ data: res }) => {
        if (res.code === 20000) {
          const { name, gender, phone, address, type } = res.data;
          setName(name);
          setGender(gender);
          setPhone(phone);
          setAddress(address);
          setType(type);
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error("获取顾客信息失败");
      });
  }, [customerId]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    service
      .put("/sys/customer", {
        customerId,
        name,
        gender,
        phone,
        address,
        type,
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
      name === "" ||
      phone === "" ||
      gender === "" ||
      type === "" ||
      address === ""
    )
      setDisabled(true);
    else setDisabled(false);
  }, [name, phone, gender, type, address]);

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
                <Typography>姓名</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  disabled
                  placeholder="请输入姓名"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <Typography>性别</Typography>
              </TableCell>
              <TableCell align="left">
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  sx={{
                    width: "80px",
                  }}
                >
                  <MenuItem value="男">男</MenuItem>
                  <MenuItem value="女">女</MenuItem>
                </Select>
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>
                <Typography>类型</Typography>
              </TableCell>
              <TableCell align="left">
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  sx={{ width: "130px" }}
                >
                  <MenuItem value="零售客户">零售客户</MenuItem>
                  <MenuItem value="批发客户">批发客户</MenuItem>
                </Select>
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
