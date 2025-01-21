// utils/authCheck.js
import { axiosInstance } from "../lib/axios";
import { store } from "../redux/app/store";
import { signOutSuccess, signInSuccess } from "../redux/user/userSlice";

export const checkAuthStatus = async () => {
  try {
    // First try to verify the current session
    const response = await axiosInstance.get("/auth/check");
    if (response.data) {
      store.dispatch(signInSuccess({ message: { user: response.data } }));
      return true;
    }
    return false;
  } catch (error) {
    // If verification fails, try to refresh the token
    try {
      const refreshResponse = await axiosInstance.post("/auth/refresh-token");
      if (refreshResponse.data?.data) {
        store.dispatch(signInSuccess({ message: { user: refreshResponse.data.data } }));
        return true;
      }
      return false;
    } catch (refreshError) {
      store.dispatch(signOutSuccess());
      return false;
    }
  }
};

// Add axios response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await axiosInstance.post("/auth/refresh-token");
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, sign out
        store.dispatch(signOutSuccess());
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);