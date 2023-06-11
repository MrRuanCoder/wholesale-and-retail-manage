import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { FolderOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function MyBreadcrumbs(props) {
  const { pathnames, baseUrl, breadcrumbNameMap } = props;
  return (
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
  );
}
