import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Tab from "./Tab";

export default function Sider(props) {
  const { title, menu } = props;
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const setContainerHeightFromDocument = () => {
      setContainerHeight(document.documentElement.scrollHeight);
    };

    setContainerHeightFromDocument(); // 初始化容器高度

    window.addEventListener("scroll", setContainerHeightFromDocument); // 监听页面滚动

    return () => {
      window.removeEventListener("scroll", setContainerHeightFromDocument); // 移除监听器
    };
  }, []);

  useEffect(() => {
    if (containerHeight !== 0) {
      const setContainerHeightToState = () => {
        setContainerHeight(document.documentElement.scrollHeight);
      };

      const timeoutId = setTimeout(setContainerHeightToState, 1000); // 等待1秒后再更新容器高度

      return () => {
        clearTimeout(timeoutId); // 清除定时器
      };
    }
  }, [containerHeight]);

  return (
    <Box width={"17.8%"} height={containerHeight} bgcolor={"#001529"}>
      <Box
        height={55}
        bgcolor={"#002140"}
        fontSize={"18px"}
        color={"#fff"}
        textAlign={"center"}
        lineHeight={"55px"}
      >
        {title}
      </Box>
      <Stack>
        {menu.map((item) => (
          <Tab key={item.to} to={item.to}>
            {item.icon}
            {item.text}
          </Tab>
        ))}
      </Stack>
    </Box>
  );
}
