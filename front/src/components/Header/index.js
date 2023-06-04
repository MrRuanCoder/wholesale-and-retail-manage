import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Fade } from "@mui/material";
import { Face6 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import service from "../../utils/request";
import { persistor } from "../../index";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/Slices/AuthSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 跳转到用户信息页面
  const navigate = useNavigate();

  const handleUserInfo = () => {};

  const handleLogOUt = () => {
    service
      .post("/sys/user/logout")
      .then(({ data: res }) => {
        if (res.code === 20000) {
          persistor.purge().then(() => {
            localStorage.removeItem("token");
            toast.success("退出成功");
            dispatch(setLoginState(false));
            navigate("/login");
          });
        } else throw new Error(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <Box display={"flex"} flexDirection={"row-reverse"} height={55}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <Face6 />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleUserInfo}>账户信息</MenuItem>
        <MenuItem onClick={handleLogOUt}>退出登录</MenuItem>
      </Menu>
    </Box>
  );
}
