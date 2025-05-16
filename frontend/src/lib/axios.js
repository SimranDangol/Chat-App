// eslint-disable-next-line no-unused-vars
import { store } from "@/redux/app/store";
import axios from "axios";

 const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});


export {axiosInstance};


