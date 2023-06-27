import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Message, Note, Settings } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const menu = [
  {
    to: "log",
    icon: <Message />,
    text: "出入库日志",
  },
  {
    to: "statistics",
    icon: <Note />,
    text: "库存统计",
  },
  {
    to: "manage",
    icon: <Settings />,
    text: "仓库管理",
  },
];

export default function Storekeeper() {
  return (
    <Box display={"flex"}>
      <Sider title="仓库管理员" menu={menu} />

      <Stack bgcolor={"#fff"} flexGrow={1}>
        <Header />
        <Divider />
        <Outlet />
      </Stack>
    </Box>
  );
}
