import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Message, Note } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const menu = [
  {
    to: "1",
    icon: <Message />,
    text: "出入库日志",
  },
  {
    to: "2",
    icon: <Note />,
    text: "库存信息",
  },
];

export default function Storekeeper() {
  return (
    <Box display={"flex"}>
      <Sider title="仓库管理员" menu={menu} />

      <Stack bgcolor={"#fff"} width={"82.2%"}>
        <Header />
        <Divider />
        <Outlet />
      </Stack>
    </Box>
  );
}
