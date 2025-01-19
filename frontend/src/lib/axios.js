// eslint-disable-next-line no-unused-vars
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});
