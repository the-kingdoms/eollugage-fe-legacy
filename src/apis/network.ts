import axios from "axios";

interface ApiResponse {
  id: string;
  msg: string;
}

const setTokenFromLocalStorage = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return null;
  }
  return accessToken;
};

const eollugageUrl = "https://api.eolluga.com";

const api = axios.create({
  baseURL: eollugageUrl,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
  },
  validateStatus: status => {
    return status < 300;
  },
});
api.interceptors.request.use(
  async config => {
    if (typeof document !== "undefined") {
      const token = getTokenFromLocalStorage();
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
export { eollugageUrl, setTokenFromLocalStorage, getTokenFromLocalStorage };
export type { ApiResponse };
