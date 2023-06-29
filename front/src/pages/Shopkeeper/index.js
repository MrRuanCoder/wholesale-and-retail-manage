import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Note, Person, Settings } from "@mui/icons-material";
import { Outlet, useLocation } from "react-router-dom";
import MyBreadcrumbs from "../../components/MyBreadcrumbs";

const menu = [
  {
    to: "goods",
    icon: <Note />,
    text: "店铺售货信息",
  },
  {
    to: "customer",
    icon: <Person />,
    text: "人员信息",
  },
  {
    to: "storage",
    icon: <Settings />,
    text: "店铺库存统计",
  },
];

const baseUrl = "/shopkeeper";

const breadcrumbNameMap = {
  "/customer": "人员信息",
  "/customer/overview": "主页",
  "/customer/add": "添加客户",
  "/customer/update": "修改客户信息",
  "/goods": "商品信息",
  "/storage": "店铺库存统计",
};

export default function Supplier() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((val, i) => i > 1);

  return (
    <Box display={"flex"}>
      <Sider title="店长" menu={menu} />

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
