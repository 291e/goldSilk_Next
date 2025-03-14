import { create } from "zustand";
import axiosInstance from "@/shared/api/axiosInstance";
import { User } from "@/shared/types/auth";
import { useCartStore } from "./useCartStore";

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (
    provider: "naver" | "kakao" | "google",
    token: string,
    refreshToken: string
  ) => void;
  register: (
    socialProvider: string,
    socialId: string,
    username: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<void>;
  logout: (provider?: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  initializeAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,

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
      useCartStore.getState().loadCart();
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

  // ✅ 소셜 로그인
  socialLogin: (provider, token, refreshToken) => {
    sessionStorage.setItem("refresh_token", refreshToken);
    set({ token: refreshToken, isAuthenticated: true });
    useCartStore.getState().loadCart();
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
  logout: async (provider) => {
    const refreshToken = sessionStorage.getItem("refresh_token");

    if (provider) {
      try {
        await axiosInstance.post("/auth/social-logout", {
          provider,
          token: refreshToken, // ✅ 현재 저장된 토큰 전달
        });

        console.log(`✅ ${provider} 소셜 로그아웃 성공`);
      } catch (error) {
        console.error(`🚨 ${provider} 소셜 로그아웃 실패`, error);
      }
    }

    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");

    delete axiosInstance.defaults.headers.common["Authorization"];

    // ✅ 3. 장바구니 초기화 (UI만)
    useCartStore.getState().resetCart();

    // ✅ 세션 스토리지 초기화
    set({ user: null, token: null, isAuthenticated: false });
  },

  // ✅ 유저 정보 가져오기 (리프레시 토큰 사용)
  fetchUser: async () => {
    try {
      const refreshToken = sessionStorage.getItem("refresh_token");
      if (!refreshToken) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isAdmin: false,
        });
        return;
      }

      const { data } = await axiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${refreshToken}` }, // ✅ 최신 리프레시 토큰 사용
      });

      set({
        user: data,
        isAuthenticated: true,
        isAdmin: data.is_admin || false,
        isLoading: false,
      });
    } catch (error) {
      console.error("🚨 유저 정보 불러오기 실패:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isAdmin: false,
      });
      sessionStorage.removeItem("refresh_token");
    }
  },

  // ✅ 앱 실행 시 로그인 상태 확인 (리프레시 토큰 유지)
  initializeAuth: () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (refreshToken) {
      set({ token: refreshToken, isLoading: true });
      axiosInstance.defaults.headers.Authorization = `Bearer ${refreshToken}`;
      useUserStore.getState().fetchUser(); // ✅ 로그인 상태 유지
    } else {
      set({ isLoading: false });
    }
  },
}));

// ✅ 클라이언트에서 실행되도록 설정
if (typeof window !== "undefined") {
  useUserStore.getState().initializeAuth();
}
