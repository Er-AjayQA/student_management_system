// *********** Imports *********** //
import axios from "axios";

// *********** Config Axios *********** //
const AdminAPI = axios.create({
  baseURL: "http://localhost:8000/api/v1/admin",
});
const StudentAPI = axios.create({
  baseURL: "http://localhost:8000/api/v1/student",
});

// *********** Interceptor to Add Auth Token *********** //
AdminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// *********** Interceptor to Handle Errors *********** //
AdminAPI.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// *********** Interceptor to Add Auth Token *********** //
StudentAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// *********** Interceptor to Handle Errors *********** //
StudentAPI.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// *********** Exports *********** //
export { AdminAPI, StudentAPI };
