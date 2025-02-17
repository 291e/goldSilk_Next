import { create } from "zustand";
import axiosInstance from "@/shared/api/axiosInstance";
import { User } from "../types/auth";

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (
    provider: "naver" | "kakao" | "google",
    token: string,
    refreshToken: string
  ) => void;
  register: (
    username: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  initializeAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  // ✅ 로그인 기능 (리프레시 토큰 사용)
  login: async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("🔄 로그인 성공, 받은 데이터:", data);

      // ✅ 리프레시 토큰 저장 (세션 스토리지만 사용)
      sessionStorage.setItem("refresh_token", data.refresh_token);

      // ✅ 상태 업데이트
      set({
        user: data.user,
        token: data.refresh_token,
        isAuthenticated: true,
      });

      // ✅ 로그인 후 유저 정보 즉시 가져오기
      await useUserStore.getState().fetchUser();
    } catch (error: any) {
      console.error("🚨 로그인 실패:", error);

      // ✅ API 응답 메시지를 확인하여 적절한 오류 메시지 반환
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;

        if (errorMessage.includes("비밀번호")) {
          throw "비밀번호가 일치하지 않습니다.";
        }
        if (errorMessage.includes("이메일")) {
          throw "존재하지 않는 이메일입니다.";
        }
      }

      throw "로그인에 실패했습니다. 다시 시도해주세요.";
    }
  },

  socialLogin: (provider, token, refreshToken) => {
    console.log(`✅ ${provider} 소셜 로그인 완료:`, token, refreshToken);

    // ✅ 세션 스토리지에 리프레시 토큰 저장
    sessionStorage.setItem("refresh_token", refreshToken);

    // ✅ 상태 업데이트
    set({ token: refreshToken, isAuthenticated: true });

    // ✅ 유저 정보 가져오기
    useUserStore.getState().fetchUser();
  },

  // ✅ 회원가입 기능
  register: async (username, email, password, phone) => {
    try {
      await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        phone,
      });
    } catch (error) {
      console.error("🚨 회원가입 실패:", error);
      throw error;
    }
  },

  // ✅ 로그아웃 기능 (세션 스토리지 초기화)
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    sessionStorage.removeItem("refresh_token");
  },

  // ✅ 유저 정보 가져오기 (리프레시 토큰 사용)
  fetchUser: async () => {
    try {
      const refreshToken = sessionStorage.getItem("refresh_token");
      if (!refreshToken) {
        console.log("🔄 리프레시 토큰 없음, fetchUser 중단");
        return;
      }

      console.log("🔄 auth/me 요청 보냄, 토큰:", refreshToken);

      const { data } = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${refreshToken}` }, // ✅ 최신 리프레시 토큰 사용
      });

      set({ user: data, isAuthenticated: true });
    } catch (error) {
      console.error("🚨 유저 정보 불러오기 실패:", error);
      set({ user: null, isAuthenticated: false });
      sessionStorage.removeItem("refresh_token");
    }
  },

  // ✅ 앱 실행 시 로그인 상태 확인 (리프레시 토큰 유지)
  initializeAuth: () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (refreshToken) {
      set({ token: refreshToken });
      axiosInstance.defaults.headers.Authorization = `Bearer ${refreshToken}`;
      useUserStore.getState().fetchUser(); // ✅ 로그인 상태 유지
    }
  },
}));

// ✅ 클라이언트에서 실행되도록 설정
if (typeof window !== "undefined") {
  useUserStore.getState().initializeAuth();
}
