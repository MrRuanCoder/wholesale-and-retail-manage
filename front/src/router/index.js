import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import UserManage from "../pages/Admin/UserManage";
import OrderManage from "../pages/Admin/OrderManage";
import SystemManage from "../pages/Admin/SystemManage";
import AddUser from "../pages/Admin/UserManage/AddUser";
import UpdateUser from "../pages/Admin/UserManage/UpdateUser";
import UserManageOverview from "../pages/Admin/UserManage/Overview";
import Shopkeeper from "../pages/Shopkeeper";
import Storekeeper from "../pages/StoreKeeper";
import Customer from "../pages/Customer";
import Salesman from "../pages/Salesman";
import Supplier from "../pages/Supplier";
import Purchaser from "../pages/Purchaser";

const router = [
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
    auth: true,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "user",
        element: <UserManage />,
        children: [
          {
            path: "overview",
            element: <UserManageOverview />,
          },

          {
            path: "add",
            element: <AddUser />,
          },
          {
            path: "update",
            element: <UpdateUser />,
          },
          {
            path: "",
            element: <Navigate to="overview" replace={true} />,
          },
        ],
      },
      {
        path: "order",
        element: <OrderManage />,
      },
      {
        path: "system",
        element: <SystemManage />,
      },
      {
        path: "",
        element: <Navigate to="user" replace={true} />,
      },
    ],
  },
  {
    path: "/shopKeeper",
    element: <Shopkeeper />,
    children: [
      {
        path: "1",
        element: <div />,
      },
      {
        path: "2",
        element: <diiv />,
      },
    ],
  },
  {
    path: "/storeKeeper",
    element: <Storekeeper />,
    children: [
      {
        path: "1",
        element: <div />,
      },
      {
        path: "2",
        element: <div />,
      },
    ],
  },
  {
    path: "/customer",
    element: <Customer />,
    children: [
      {
        path: "1",
        element: <div />,
      },
      {
        path: "2",
        element: <div />,
      },
    ],
  },
  {
    path: "/salesman",
    element: <Salesman />,
    children: [
      {
        path: "1",
        element: <div />,
      },
      {
        path: "2",
        element: <div />,
      },
    ],
  },
  {
    path: "/supplier",
    element: <Supplier />,
    children: [
      {
        path: "1",
        element: <div />,
      },
      {
        path: "2",
        element: <diiv />,
      },
    ],
  },
  {
    path: "/purchaser",
    element: <Purchaser />,
    children: [
      {
        path: "1",
        element: <div />,
      },
      {
        path: "2",
        element: <div />,
      },
    ],
  },
];

export default router;
