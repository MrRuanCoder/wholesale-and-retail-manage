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
  Select,
  TableBody,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
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

const options = [
  { label: "店长", id: 2 },
  { label: "采购员", id: 7 },
  { label: "供应商", id: 6 },
  { label: "销售员", id: 8 },
  { label: "客户", id: 5 },
  { label: "仓库管理员", id: 9 },
];

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAdd = () => {
    service
      .post("/sys/user/add", {
        username,
        password,
        phone,
        email,
        address,
        roleId,
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
      username === "" ||
      password === "" ||
      phone === "" ||
      email === "" ||
      email === "" ||
      address === "" ||
      roleId === null ||
      description === ""
    )
      setDisabled(true);
    else setDisabled(false);
  }, [username, password, phone, email, address, roleId, description]);

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
                <Typography>用户名</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="请输入用户名"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>
                <Typography>密码</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  placeholder="请输入密码"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <Typography>角色</Typography>
              </TableCell>
              <TableCell align="left">
                <Select
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  sx={{ width: 200 }}
                >
                  {options.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
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
