import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("algoforge_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is rejected/expired, clear it so the app falls back to
// the logged-out state instead of looping on 401s.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("algoforge_token");
      localStorage.removeItem("algoforge_user");
    }
    return Promise.reject(err);
  }
);

export default api;
