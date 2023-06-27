import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Divider, Stack } from "@mui/material";
import { Note, Approval, Contacts } from "@mui/icons-material";
import { Outlet, useLocation } from "react-router-dom";
import MyBreadcrumbs from "../../components/MyBreadcrumbs";

const menu = [
  {
    to: "goods",
    icon: <Note />,
    text: "采购商品信息",
  },
  {
    to: "2",
    icon: <Approval />,
    text: "采购申请",
  },
  {
    to: "supplierInfo",
    icon: <Contacts />,
    text: "供应商信息管理",
  },
];

const baseUrl = "/purchaser";

const breadcrumbNameMap = {
  "/supplierInfo": "供应商信息管理",
  "/supplierInfo/overview": "主页",
  "/supplierInfo/add": "添加供应商",
  "/supplierInfo/update": "修改供应商信息",
  "/goods": "采购商品信息",
};

export default function Supplier() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((val, i) => i > 1);

  return (
    <Box display={"flex"}>
      <Sider title="采购员" menu={menu} />

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
