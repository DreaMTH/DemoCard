import axios from "axios";

const relatedAxios = axios.create({
  baseURL: "http://localhost:5000",
});

export default relatedAxios;
