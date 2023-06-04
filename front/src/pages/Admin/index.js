import React from "react";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Box, Breadcrumbs, Divider, Stack, Typography } from "@mui/material";
import { FolderOpen, Grading, Person, Settings } from "@mui/icons-material";
import { Outlet, useLocation, Link } from "react-router-dom";

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

export default function Admin() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((val, i) => i > 1);

  return (
    <Box display={"flex"}>
      <Sider title="系统管理员" menu={menu} />

      <Stack bgcolor={"#fff"} width={"82.2%"}>
        <Header />
        <Divider />
        <Breadcrumbs
          sx={{
            marginLeft: "20px",
            marginY: "10px",
            fontSize: "14px",
          }}
        >
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return last ? (
              <Typography
                key={baseUrl + to}
                fontSize={"14px"}
                sx={{
                  color: "#4c4c4c",
                }}
              >
                <FolderOpen sx={{ verticalAlign: "bottom" }} />
                {breadcrumbNameMap[to]}
              </Typography>
            ) : (
              <Link style={{ color: "#154AB6" }} to={baseUrl + to} key={to}>
                <FolderOpen sx={{ verticalAlign: "bottom" }} />
                {breadcrumbNameMap[to]}
              </Link>
            );
          })}
        </Breadcrumbs>
        <Outlet />
      </Stack>
    </Box>
  );
}

const baseUrl = "/admin";

const breadcrumbNameMap = {
  "/user": "人员管理",
  "/user/overview": "主页",
  "/user/add": "添加用户",
  "/user/update": "修改用户",
  "/order": "订单管理",
  "/system": "系统管理",
};
