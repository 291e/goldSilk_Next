import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goldsilk.net";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: JWT 토큰 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 클라이언트에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 공통 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
