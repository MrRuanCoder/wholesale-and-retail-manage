import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Note, Shop } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const menu = [
  {
    to: "1",
    icon: <Note />,
    text: "供应商品信息",
  },
  {
    to: "2",
    icon: <Shop />,
    text: "上架商品",
  },
];

export default function Supplier() {
  return (
    <Box display={"flex"}>
      <Sider title="供应商" menu={menu} />

      <Stack bgcolor={"#fff"} width={"82.2%"}>
        <Header />
        <Divider />
        <Outlet />
      </Stack>
    </Box>
  );
}
