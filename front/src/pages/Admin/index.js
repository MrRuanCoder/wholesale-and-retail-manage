import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Grading, Person, Settings } from "@mui/icons-material";
import { Outlet, useLocation } from "react-router-dom";
import MyBreadcrumbs from "../../components/MyBreadcrumbs";

const menu = [
  {
    to: "user",
    icon: <Person />,
    text: "人员管理",
  },
  {
    to: "order",
    icon: <Grading />,
    text: "订单管理",
  },
  {
    to: "system",
    icon: <Settings />,
    text: "系统管理",
  },
];

const baseUrl = "/admin";

const breadcrumbNameMap = {
  "/user": "人员管理",
  "/user/overview": "主页",
  "/user/add": "添加用户",
  "/user/update": "修改用户",
  "/order": "订单管理",
  "/system": "系统管理",
};

export default function Admin() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((val, i) => i > 1);

  return (
    <Box display={"flex"}>
      <Sider title="系统管理员" menu={menu} />

      <Stack bgcolor={"#fff"} flexGrow={1}>
        <Header />
        <Divider />
        <MyBreadcrumbs
          pathnames={pathnames}
          baseUrl={baseUrl}
          breadcrumbNameMap={breadcrumbNameMap}
        />
        <Outlet />
      </Stack>
    </Box>
  );
}
