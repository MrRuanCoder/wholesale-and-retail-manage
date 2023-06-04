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
  Autocomplete,
  TableBody,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Lock, LockOpen } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import service from "../../../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../redux/Slices/UserSlice";
import { toast } from "react-toastify";

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

const roleMap = {
  1: "系统管理员",
  2: "店长",
  5: "客户",
  6: "供货商",
  7: "采购员",
  8: "销售员",
  9: "仓库管理员",
};

export default function UpdateUser() {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get("userId"));

  const user = useSelector((state) =>
    state.users.list.filter((item) => item.userId === userId).at(0)
  );

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [role, setRole] = useState({
    label: roleMap[user.roleId],
    id: user.roleId,
  });
  const [description, setDescription] = useState(user.description);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUpdate = () => {
    service
      .put("/sys/user", {
        userId,
        username,
        password: password || user.password,
        phone,
        email,
        address,
        roleId: role?.id,
        description,
      })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          dispatch(
            updateUser({
              userId,
              username,
              password,
              phone,
              email,
              address,
              roleId: role?.id,
              description,
            })
          );
          toast.success("修改成功");
          navigate("../overview");
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const [changePwd, setChangePwd] = useState(false);

  useEffect(() => {
    if (changePwd) setPassword("");
  }, [changePwd]);

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
                <Typography>用户名</Typography>
              </TableCell>
              <TableCell align="right">
                <TextField
                  disabled
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
                  disabled={!changePwd}
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setChangePwd((val) => !val)}>
                          {changePwd ? <LockOpen /> : <Lock />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
              <TableCell align="right">
                <Autocomplete
                  disablePortal
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  options={options}
                  sx={{ width: 200 }}
                  value={role}
                  onChange={(event, newValue) => {
                    setRole(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
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
        <Button variant="contained" onClick={handleUpdate}>
          修改
        </Button>
      </Box>
    </Stack>
  );
}
