import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Note } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const menu = [
  {
    to: "1",
    icon: <Note />,
    text: "批发商品信息",
  },
  {
    to: "2",
    icon: <Note />,
    text: "零售商品信息",
  },
];

export default function Customer() {
  return (
    <Box display={"flex"}>
      <Sider title="客户" menu={menu} />

      <Stack bgcolor={"#fff"} width={"82.2%"}>
        <Header />
        <Divider />
        <Outlet />
      </Stack>
    </Box>
  );
}
