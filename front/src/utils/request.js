import axios from "axios";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const service = axios.create({
  baseURL: "http://172.20.226.231:9999/",
});

service.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  return config;
});

export default service;
