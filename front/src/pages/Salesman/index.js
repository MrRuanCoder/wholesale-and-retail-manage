import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Note, FormatListBulleted } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const menu = [
  {
    to: "goodsList",
    icon: <FormatListBulleted />,
    text: "售货商品列表",
  },
  {
    to: "2",
    icon: <Note />,
    text: "售货单",
  },
];

export default function Supplier() {
  return (
    <Box display={"flex"}>
      <Sider title="售货员" menu={menu} />

      <Stack bgcolor={"#fff"} flexGrow={1}>
        <Header />
        <Divider />
        <Outlet />
      </Stack>
    </Box>
  );
}
