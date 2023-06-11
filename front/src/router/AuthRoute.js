import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const pathMap = {
  1: "/admin",
  2: "/shopkeeper",
  5: "/customer",
  6: "/supplier",
  7: "/purchaser",
  8: "/salesman",
  9: "/storekeeper",
};

const AuthRoute = ({ children, auth }) => {
  const token = localStorage.getItem("token") || "";
  const isLogin = useSelector((state) => state.auth.isLogin);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  // 开发时
  // return children;

  if (auth) {
    if (isLogin) return <Navigate to={pathMap[role]} />;
    else return children;
  }

  if (token === "") {
    return <Navigate to="/login" />;
  }
  // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
  if (token && isLogin) {
    // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
    if (location.pathname === "/" || location.pathname === "/login") {
      return <Navigate to={pathMap[role]} />;
    }

    // 如果去不应去的页面，会跳转回自身首页面
    if (!location.pathname.startsWith(pathMap[role]))
      return <Navigate to={pathMap[role]} />;
  }

  return children;
};
export default AuthRoute;
