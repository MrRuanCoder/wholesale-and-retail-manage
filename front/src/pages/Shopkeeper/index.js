import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Note, Person } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const menu = [
  {
    to: "1",
    icon: <Note />,
    text: "店铺售货信息",
  },
  {
    to: "2",
    icon: <Person />,
    text: "人员信息",
  },
];

export default function Supplier() {
  return (
    <Box display={"flex"}>
      <Sider title="店长" menu={menu} />

      <Stack bgcolor={"#fff"} width={"82.2%"}>
        <Header />
        <Divider />
        <Outlet />
      </Stack>
    </Box>
  );
}
