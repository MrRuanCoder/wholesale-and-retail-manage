import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Note, Approval } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const menu = [
  {
    to: "1",
    icon: <Note />,
    text: "采购商品信息",
  },
  {
    to: "2",
    icon: <Approval />,
    text: "采购申请",
  },
];

export default function Supplier() {
  return (
    <Box display={"flex"}>
      <Sider title="采购员" menu={menu} />

      <Stack bgcolor={"#fff"} width={"82.2%"}>
        <Header />
        <Divider />
        <Outlet />
      </Stack>
    </Box>
  );
}
