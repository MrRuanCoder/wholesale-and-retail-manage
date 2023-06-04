import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "./router/AuthRoute";
import router from "./router";
import "./App.css";

export default function App() {
  const RouteAuthFun = (routeList) => {
    return routeList.map((item) => {
      return (
        <Route
          path={item.path}
          element={
            <AuthRoute auth={item.auth} key={item.path}>
              {item.element}
            </AuthRoute>
          }
          key={item.path}
        >
          {item?.children && RouteAuthFun(item.children)}
        </Route>
      );
    });
  };
  return <Routes>{RouteAuthFun(router)}</Routes>;
}
