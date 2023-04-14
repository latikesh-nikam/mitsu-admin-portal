import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL!;
// const baseURL = "http://192.168.101.59:3000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  let token = `${localStorage.getItem("access_token")}`;
  const temp: any = {
    ...config.headers,
    Authorization: `Bearer ${token || ""}`,
    "Content-Type": "multipart/form-data",
  };
  config.headers = temp;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 || error?.response.status === 403
    ) {
      originalRequest._retry = true;
      return;
    } else {
      return;
    }
  }
);

export default axiosInstance;
