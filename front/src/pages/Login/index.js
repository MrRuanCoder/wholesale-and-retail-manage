import {
  Box,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Person,
  LockOpen,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import service from "../../utils/request";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState, setRole } from "../../redux/Slices/AuthSlice.js";

const pathMap = {
  1: "/admin",
  2: "/shopkeeper",
  5: "/customer",
  6: "/supplier",
  7: "/purchaser",
  8: "/salesman",
  9: "/storekeeper",
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btnState, setBtnState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = () => {
    service
      .post("/sys/user/login", { username, password })
      .then(({ data: res }) => {
        if (res.code === 20000) {
          dispatch(setLoginState(true));
          localStorage.setItem("token", res.data.token);
          const payload = jwt_decode(res.data.token);
          const sub = payload.sub;
          const roleId = JSON.parse(sub).roleId;
          dispatch(setRole(roleId));
          navigate(pathMap[roleId]);
          toast.success("登录成功");
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    if (username === "" || password === "") setBtnState(false);
    else setBtnState(true);
  }, [username, password]);

  return (
    <Box
      display={"flex"}
      width={1280}
      height={508}
      borderRadius={"15px"}
      overflow={"hidden"}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 20,
      }}
    >
      <Box width={"50%"} height={"100%"} bgcolor={"#7F88BB"}></Box>
      <Stack
        width={"50%"}
        height={"100%"}
        bgcolor={"#fff"}
        alignItems={"center"}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            width: "357px",
            height: "42px",
            marginTop: "130px",
            "& .MuiOutlinedInput-root": {
              height: "42px",
              fontSize: "14px",
              borderRadius: "20px",
            },
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOpen />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((isShow) => !isShow)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="密码"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            width: "357px",
            height: "42px",
            marginTop: "30px",
            "& .MuiOutlinedInput-root": {
              height: "42px",
              fontSize: "14px",
              borderRadius: "20px",
            },
          }}
        />
        <Button
          variant="contained"
          disabled={!btnState}
          sx={{
            bgcolor: "#3291F8",
            width: "357px",
            height: "42px",
            marginTop: "85px",
            fontSize: "20px",
            borderRadius: "20px",
          }}
          onClick={login}
        >
          登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
        </Button>
        <Typography
          mt={"94px"}
          fontSize={"14px"}
          sx={{ color: "#2979FF", cursor: "pointer" }}
        >
          忘记密码
        </Typography>
      </Stack>
    </Box>
  );
}
