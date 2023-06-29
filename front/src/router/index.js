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
import UserInfo from "../pages/Shopkeeper/UserInfo";
import UserInfoOverview from "../pages/Shopkeeper/UserInfo/Overview";
import UserInfoAdd from "../pages/Shopkeeper/UserInfo/Add";
import UserInfoUpdate from "../pages/Shopkeeper/UserInfo/Update";
import SupplierInfo from "../pages/Purchaser/SupplierInfo";
import SupplierInfoOverview from "../pages/Purchaser/SupplierInfo/Overview.js";
import SupplierInfoAdd from "../pages/Purchaser/SupplierInfo/Add";
import SupplierInfoUpdate from "../pages/Purchaser/SupplierInfo/Update";
import GoodsList from "../pages/Salesman/GoodsList";
import StockLog from "../pages/StoreKeeper/Log";
import StockStatistics from "../pages/StoreKeeper/Statistics";
import StoreManage from "../pages/StoreKeeper/Manage";
import ShopGoodsInfo from "../pages/Shopkeeper/GoodsInfo";
import PurchaseGoodsInfo from "../pages/Purchaser/GoodsInfo";
import SaleOrder from "../pages/Salesman/SaleOrder";
import ShopKeeperStorage from "../pages/Shopkeeper/Storage";

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
        path: "goods",
        element: <ShopGoodsInfo />,
      },
      {
        path: "storage",
        element: <ShopKeeperStorage />,
      },
      {
        path: "customer",
        element: <UserInfo />,
        children: [
          {
            path: "overview",
            element: <UserInfoOverview />,
          },
          {
            path: "add",
            element: <UserInfoAdd />,
          },
          {
            path: "update",
            element: <UserInfoUpdate />,
          },
          {
            path: "",
            element: <Navigate to="overview" replace={true} />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="goods" replace={true} />,
      },
    ],
  },
  {
    path: "/storeKeeper",
    element: <Storekeeper />,
    children: [
      {
        path: "log",
        element: <StockLog />,
      },
      {
        path: "statistics",
        element: <StockStatistics />,
      },
      {
        path: "manage",
        element: <StoreManage />,
      },
      {
        path: "",
        element: <Navigate to="log" replace={true} />,
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
        path: "goodsList",
        element: <GoodsList />,
      },
      {
        path: "saleOrder",
        element: <SaleOrder />,
      },
      {
        path: "",
        element: <Navigate to="goodsList" replace={true} />,
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
        path: "goods",
        element: <PurchaseGoodsInfo />,
      },
      {
        path: "2",
        element: <div />,
      },
      {
        path: "supplierInfo",
        element: <SupplierInfo />,
        children: [
          {
            path: "overview",
            element: <SupplierInfoOverview />,
          },
          {
            path: "add",
            element: <SupplierInfoAdd />,
          },
          {
            path: "update",
            element: <SupplierInfoUpdate />,
          },
          {
            path: "",
            element: <Navigate to="overview" replace={true} />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="goods" replace={true} />,
      },
    ],
  },
];

export default router;
