import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const pathMap = {
  1: "/admin",
  2: "/shopkeeper",
  5: "/customer",
  6: "/supplier",
  7: "/purchaser",
  8: "/salesman",
  9: "/storekeeper",
};

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const isLogin = useSelector((state) => state.auth.isLogin);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
    // 这里判断条件是：token 存在并且是匹配到路由并且是已经登录的状态
    if (token && isLogin) {
      // 如果你已经登录了，但是你通过浏览器里直接访问login的话不允许直接跳转到login路由，必须通过logout来控制退出登录或者是token过期返回登录界面
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate(pathMap[role]);
      }

      // 如果去不应去的页面，会跳转回自身首页面
      if (location.pathname.startsWith("/admin") && pathMap[role] !== "/admin")
        navigate(pathMap[role]);
      for (const roleId in pathMap) {
        const baseUrl = pathMap[roleId];
        if (location.pathname.startsWith(baseUrl) && pathMap[role] !== baseUrl)
          navigate(pathMap[role]);
      }
      // } else {
      //   // 如果是其他路由就跳到其他的路由
      //   navigate(location.pathname);
      // }
    }
  });

  return children;
};
export default AuthRoute;
