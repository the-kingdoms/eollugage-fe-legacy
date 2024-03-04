import axios from "axios";

const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return null;
  }
  return accessToken;
};

const eollugageUrl = "http://13.124.40.182/";
const api = axios.create({
  baseURL: eollugageUrl,
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
export { eollugageUrl };
