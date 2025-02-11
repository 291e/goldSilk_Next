import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://goldsilk.net";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청마다 최신 리프레시 토큰 사용
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // 🔹 SSR 방지
      const refreshToken = sessionStorage.getItem("refresh_token");
      if (refreshToken) {
        config.headers.Authorization = `Bearer ${refreshToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 공통 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("🚨 API Error:", error.response?.data || error.message);

    // ✅ 401 에러 시 리프레시 토큰 재발급 요청
    if (error.response?.status === 401) {
      const newToken = await refreshAuthToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(error.config); // ✅ 요청 재시도
      }
    }

    return Promise.reject(error);
  }
);

// ✅ 리프레시 토큰을 사용해 새로운 엑세스 토큰을 가져오는 함수
async function refreshAuthToken() {
  try {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    const { data } = await axios.post(`${API_URL}/auth/refresh`, {
      token: refreshToken,
    });

    sessionStorage.setItem("refresh_token", data.refresh_token); // 🔹 리프레시 토큰 갱신
    console.log("🔄 토큰 갱신 완료:", data.refresh_token);

    return data.refresh_token; // ✅ 새로운 토큰 반환
  } catch (error) {
    console.error("🚨 토큰 갱신 실패:", error);
    sessionStorage.removeItem("refresh_token"); // 🔹 실패 시 토큰 삭제
    return null;
  }
}

export default axiosInstance;
