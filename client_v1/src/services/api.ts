import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // 🔹 Replace with your backend URL

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================== Interceptors ==================

// 🔹 Request Interceptor - attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage/cookies
    if (token && !config.url?.includes("/auth/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor - handle errors globally (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired / unauthorized
      console.error("Unauthorized! Redirecting to login...");
      // You can clear storage & redirect to login page
      localStorage.removeItem("token");
    
    }
    return Promise.reject(error);
  }
);

// ================== Auth APIs ==================
export const loginApi = async (username: string, password: string) => {
  debugger
  const response = await api.post("/auth/login", { username, password });

  // 🔹 Save token after login
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// ================== User APIs ==================
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const fetchUsersApi = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const createUserApi = async (user: Omit<User, "id">) => {
  const response = await api.post("/users", user);
  return response.data;
};
