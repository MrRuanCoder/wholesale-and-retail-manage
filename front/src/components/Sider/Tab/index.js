import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default function Tab(props) {
  const { to, children } = props;

  return (
    <Box
      display={"flex"}
      height={50}
      textAlign={"center"}
      lineHeight={"50px"}
      paddingX={"30px"}
    >
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "nav-active" : "nav-pending")}
      >
        {children}
      </NavLink>
    </Box>
  );
}
