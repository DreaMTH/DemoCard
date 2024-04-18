import axios from "axios";

const relatedAxios = axios.create({
  baseURL: "http://localhost:5000",
});
relatedAxios.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});
export default relatedAxios;
